import {useEffect, useState} from "react";
import {Card} from "@/components/ui/card";
import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import {Keypair, Connection, clusterApiUrl, PublicKey} from "@solana/web3.js";
import {createMint, getOrCreateAssociatedTokenAccount, mintTo, getMint} from "@solana/spl-token";
import {useWallet} from "@solana/wallet-adapter-react";
import { TailSpin } from "react-loader-spinner";
import { fetchTokenOwnedEscrow } from "@metaplex-foundation/mpl-token-metadata";
import Image from "next/image";
import {ExternalLink} from "lucide-react";

const Status = {
    CREATE: 'create',
    PROCESSING: 'processing',
    MINT: 'swap'
}

const RPC_LINK = process.env.NEXT_PUBLIC_RPC_LINK ? process.env.NEXT_PUBLIC_RPC_LINK : clusterApiUrl("devnet")
const connection = new Connection(RPC_LINK);

function WaitingTokenCreation(){
    return (
        <div className="flex flex-row p-3 justify-center items-center mt-4">
        {/*<Card className="flex flex-row p-3 bg-gray-900 bg-opacity-50 border border-blue-500/20 rounded-lg text-xs my-2">*/}
            <div><TailSpin
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /></div>
            <div className="pl-3 text-lg">Creating Token...</div>
        </div>
    );
}

function TokenInformation({tokenAddress}: any){
    return(
        <div className="flex flex-row p-3">
        {/*<Card className="flex flex-row p-3 bg-gray-900 bg-opacity-50 border border-blue-500/20 rounded-lg text-xs my-2">*/}
            <div className="text-sm">Token Address:</div>
            <div className="pl-3">{tokenAddress}</div>
        </div>
    );

}

export default function CreateToken({tokenAddressUpdate, onClose}: any){
    const { wallet, publicKey, signTransaction } = useWallet();
    const {toast} = useToast();

    const ADMIN = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.NEXT_PUBLIC_ADMIN_WALLET ?? "")));
        
    const [mintAmount, setMintAmount] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");

    const [status, setStatus] = useState(Status.CREATE);
    const [isMinting, setIsMinting] = useState(false);
    const [mintedCompleted, setMintedCompleted] = useState(false);

    async function createToken(){
        if(!wallet || !publicKey || !signTransaction){alert("Wallet Not Connected!");return;}
        if(!ADMIN){alert("404: Admin Wallet Not Connected");return;}
        setStatus(Status.PROCESSING);
        try{
            const decimals = 9; // Number of decimals for your token (like 9 for SOL)
            const token = await createMint(
                connection,         // Connection
                ADMIN,             // Payer
                ADMIN.publicKey,   // Mint Authority
                null,               // Freeze Authority (set to null if not needed)
                decimals            // Decimals
            );
            setTokenAddress(token.toString());
            console.log("Token created! Token address:", token.toBase58());
        }catch(e){
            console.log(e);
            alert("Token Creation Failed");
            setStatus(Status.CREATE);
        }
    }

    async function fetchToken(){

    }

    useEffect(()=>{
        if(!wallet || !publicKey){return}
        if(!tokenAddress){console.log("Token Address not found");return}
        if(status !== Status.PROCESSING){return;}
        console.log("Trying to fetch token info")
        let token;
        try{ token = new PublicKey(tokenAddress);}
        catch(e){console.log("Invalid Token Address");return;}
        
        (async function getBalanceEvery10Seconds() {
            try{
                console.log("Fetching Token Info");
                console.log("Token Address:", tokenAddress);
                const mintInfo = await getMint(connection, token);
                console.log("Token Found")
                console.log("Mint Info:", mintInfo);
                toast({
                    title: "Token Successfully Created",
                    description: (
                        <div className="pr-4">
                           <p>Address: {tokenAddress} </p>
                           <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => window.open(`https://explorer.solana.com/address/${tokenAddress}?cluster=devnet`, '_blank')}
                        >
                            View on Solana Explorer
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                        </div>
                    ),
                    duration: 5000,
                });
                tokenAddressUpdate(tokenAddress);
                setStatus(Status.MINT);
                return;
            }catch(e){
                //console.log(e);
            }
            setTimeout(getBalanceEvery10Seconds, 5000);
        })();
    }, [status, tokenAddress]);

    async function mintToken(){
        if(!wallet || !publicKey || !signTransaction){alert("Wallet Not Connected!");return;}
        if(!ADMIN){alert("404: Admin Wallet Not Connected");return;}
        if(!tokenAddress){alert("Token Address not found");return;}
        if(status !== Status.MINT){return;}

        const amount = parseInt(mintAmount);
        console.log("Minting", amount, "tokens");
        console.log("Token Address:", tokenAddress);
        if(amount < 1){alert("Invalid Amount");return;}
        
        setIsMinting(true);
        const USER = publicKey;
        try{
            const token = new PublicKey(tokenAddress);
            const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                ADMIN,  // Payer
                token,  // Token mint
                USER,    // Owner of the token account
                true
            );
            console.log("Token account created! Address:", tokenAccount.address.toBase58());
            const mintedAmount = amount * Math.pow(10, 9); // Mint 1M tokens with 9 decimals
            const tx = await mintTo(
                connection,
                ADMIN,
                token,
                tokenAccount.address,
                ADMIN.publicKey,   // Mint authority
                mintedAmount
            );
            console.log("Minted", amount, "tokens to", tokenAccount.address.toBase58());
            setMintedCompleted(true);
            toast({
                title: "Token Successfully Minted",
                description: (
                    <div className="pr-4">
                       <p>Tx: {tokenAddress} </p>
                       <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => window.open(`https://explorer.solana.com/tx/${tx}?cluster=devnet`, '_blank')}
                    >
                        View on Solana Explorer
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    </div>
                ),
                duration: 5000,
            })
        }catch(e){
            alert("Error Minting Token. Please Try Again");
            console.log(e);
        }
        setIsMinting(false);
    }

    return(
    <div className="pt-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-cyan-500 text-transparent bg-clip-text mt-2">
            Create & Mint New Token
        </h2>
        {/*<p className="text-cyan-200">Creating new token for: </p>*/}
        {/* Add your token creation form or content here */}
        <div className="w-[350px] h-[350px] mx-auto rounded-xl overflow-hidden mt-6">
            <Image
                width={350}
                height={350}
                src="/create_token.webp"
                alt="Create Token"
            />
        </div>
        
        {status === Status.CREATE && (
            <div className="w-[350px] mx-auto mt-6">
                <Button 
                    onClick={createToken}
                    className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 px-2 py-2 text-white text-xl font-semibold">
                    Create Token
                </Button>
            </div>
        )}
        {status === Status.PROCESSING && (<WaitingTokenCreation/>)}

        {status === Status.MINT && (
            <>
            <div className="w-[350px] mx-auto mt-4">
                <p className="text-xs font-normal py-1 mt-2 text-gray-300">Add Token Amount to Mint:</p>
                <Card className="flex flex-row p-2 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg text-sm">
                    <input type="text" value={mintAmount} onChange={(e)=>{setMintAmount(e.target.value)}} placeholder="Token Decimal" className="w-full bg-transparent px-1 py-1 border-none focus:ring-0 focus:outline-none"/>
                    <Button 
                        onClick={mintToken}
                        disabled={isMinting}
                        className={`bg-gradient-to-r ${isMinting? "from-blue-500 to-cyan-600": "from-blue-400 to-cyan-500"} hover:from-blue-500 hover:to-cyan-600 w-[100px] px-2 py-0.5 text-white text-md font-semibold`}>
                        Mint Token
                    </Button>
                </Card>
            </div>  
            {mintedCompleted && (
                <div className="w-[350px] mx-auto mt-4">
                    <Button 
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 px-2 py-2 text-white text-xl font-semibold">
                        Close
                    </Button>
                </div>
            )}
            </>
        )}
    </div>
    )
}