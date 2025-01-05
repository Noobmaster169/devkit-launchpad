'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from "@/components/ui/input"
import { X, AlertCircle, ExternalLink, CircleCheckBig } from 'lucide-react'
import { Modal } from '@/components/Modal';
import Image from "next/image"
import {useWallet, useAnchorWallet} from "@solana/wallet-adapter-react";
import {PublicKey, Connection, clusterApiUrl, Keypair} from "@solana/web3.js";
import {Program, AnchorProvider} from "@coral-xyz/anchor";
import IDL from '@/anchor/idl/amm_pool.json'
import {AmmPool} from '@/anchor/types/amm_pool';
import { useToast } from "@/components/hooks/use-toast"
import { handleCopy } from "@/utils/copy"
import InitializePool from "@/components/InitializePool";
import CreatePoolHeader from "@/components/CreatePoolHeader"
import PoolInformation from "@/components/InitializePoolInformation"
import {getAssociatedTokenAddressSync}  from "@solana/spl-token";

const DisplayType = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
    SWAP: 'swap'
}

const token1 = "SOL";
const token2 = "USDC";


// // ------------- Account Addresses ----------------
// // Address of the New Pool Account
// const [POOL_ACCOUNT,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), TOKEN_A.publicKey.toBuffer(), TOKEN_B.publicKey.toBuffer()], programId);
// // Pool Authority Account for the New Pool
// const [POOL_AUTHORITY,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), TOKEN_A.publicKey.toBuffer(), TOKEN_B.publicKey.toBuffer(), Buffer.from('authority')], programId)
// // Create Mint Liquidity Account
// const [MINT_LIQUIDITY, ] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), TOKEN_A.publicKey.toBuffer(), TOKEN_B.publicKey.toBuffer(), Buffer.from('liquidity')], programId)
// // Get the Address to store Token A for the Pool Authority
// const POOL_A = getAssociatedTokenAddressSync(TOKEN_A.publicKey, POOL_AUTHORITY, true)
// // Get the Address to store Token B for the Pool Authority
// const POOL_B = getAssociatedTokenAddressSync(TOKEN_B.publicKey, POOL_AUTHORITY, true)

// await program.methods
//         .initializePool(POOL_ID)
//         .accounts({
//             pool: POOL_ACCOUNT,
//             poolAuthority: POOL_AUTHORITY,
//             mintLiquidity: MINT_LIQUIDITY,
//             mintA: TOKEN_A.publicKey,
//             mintB: TOKEN_B.publicKey,
//         })
//         .rpc();

const RPC_LINK = process.env.NEXT_PUBLIC_RPC_LINK ? process.env.NEXT_PUBLIC_RPC_LINK : clusterApiUrl("devnet");
const connection = new Connection(RPC_LINK);
//const program = new Program(IDL as AmmPool, {connection});
const programId = new PublicKey(IDL.address);

interface PoolData{
    id: PublicKey;
    accountInitialized: boolean;
    mintA: PublicKey;
    mintB: PublicKey;
}

const samplePool = {
    id: new PublicKey("Diy3VaD1iChqKzoWFUFyFbzbZCkQLbgycYu1Qf3muxJw"),
    mintA: new PublicKey("99TfbS8ufRZR7ctj7oVM9tHJZ3Qpx667bigotonyUHTC"),
    mintB: new PublicKey("7BnqNvzPwK9RfWanqtdEaNqZh4zWEQDrMGfCgQBwVz33"),
    accountInitialized: false
}

export default function CreatePool({setIsOpened, creatingToken, setCreatingToken, setTokenUpdatingFunction, setNewPool}: any) {
    const { wallet, publicKey, signTransaction } = useWallet();
    const anchorWallet = useAnchorWallet();
    const {toast} = useToast();
    
    const onClose = ()=>{setIsOpened(false)}
    const [displayType, setDisplayType] = useState(DisplayType.DEPOSIT);

    const [poolData, setPoolData] = useState<PoolData|null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const [ammInitialized, setAmmInitialized] = useState(false);
    //const [isCreatingToken, setIsCreatingToken] = useState(false);

    async function initializePool(){
        if(!wallet || !publicKey || !signTransaction || !anchorWallet){alert("Wallet Not Connected!");return}
        if(!token1Address || !token2Address){alert("Token Addresses Required!");return}

        let token1, token2;
        try{
            token1 = new PublicKey(token1Address);
            token2 = new PublicKey(token2Address);
        }catch(e){
            alert("Error Parsing Token Address");
            return;
        }

        setIsInitializing(true);
        try{
            const POOL_ID = Keypair.generate().publicKey;
            const [poolAccount,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer()], programId);
            const [poolAuthority,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer(), Buffer.from('authority')], programId);
            const [mintLiquidity,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer(), Buffer.from('liquidity')], programId);
            const mintA = token1;
            const mintB = token2;

            const provider = new AnchorProvider(connection, anchorWallet);
            const program = new Program(IDL as AmmPool, provider);

            console.log("Creating Pool");
            const initTx = await program.methods.initializePool(POOL_ID).accounts({
                pool: poolAccount,
                poolAuthority: poolAuthority,
                mintLiquidity: mintLiquidity,
                mintA: mintA,
                mintB: mintB,
            }).rpc();
            toast({
                title: "Token Successfully Created",
                description: (
                    <div className="pr-4">
                       <p>Tx: {initTx}</p>
                       <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => window.open(`https://explorer.solana.com/tx/${initTx}?cluster=devnet`, '_blank')}
                    >
                        View on Solana Explorer
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    </div>
                ),
                duration: 5000,
            });
            const poolData : PoolData = {
                id: POOL_ID,
                accountInitialized: false,
                mintA: mintA,
                mintB: mintB
            }
            setPoolData(poolData);
        }catch(e){
            console.log("Transaction Failed")
        }
        setNewPool(true);
        setIsInitializing(false);
    }

    async function initializeTokenCreation(option:number){
        if(!wallet || !publicKey || !signTransaction){
            alert("Wallet Not Connected!")
            return
        }
        console.log("Creating Token");
        console.log("Option:", option);
        setCreatingToken(true);
        if(option == 1){
            setTokenUpdatingFunction(() => setToken1Address);
        }else{
            setTokenUpdatingFunction(() => setToken2Address);
        }
    }

    async function initializePoolAccounts(){
        if(!wallet || !publicKey || !signTransaction || !anchorWallet){alert("Wallet Not Connected!");return}
        if(!poolData){alert("Token Addresses Required!");return}
        if(!poolData.mintA || !poolData.mintB){alert("Token Addresses Required!");return}

        let token1, token2;
        try{
            token1 = poolData.mintA;
            token2 = poolData.mintB;
        }catch(e){
            alert("Error Parsing Token Address");
            return;
        }
        setIsInitializing(true);
        try{
            const POOL_ID = poolData.id;
            const [poolAccount, bump] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer()], programId);
            const [poolAuthority,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer(), Buffer.from('authority')], programId);
            const [mintLiquidity,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer(), Buffer.from('liquidity')], programId);
            const mintA = token1;
            const mintB = token2;
            const poolA = getAssociatedTokenAddressSync(token1, poolAuthority, true);
            const poolB = getAssociatedTokenAddressSync(token2, poolAuthority, true);

            const provider = new AnchorProvider(connection, anchorWallet);
            const program = new Program(IDL as AmmPool, provider);

            const initializeAmmTx = await program.methods
                .initializePoolAccounts()
                .accounts({
                    pool: poolAccount,
                    poolAuthority: poolAuthority,
                    mintLiquidity: mintLiquidity,
                    mintA: mintA,
                    mintB: mintB,
                    poolAccountA: poolA,
                    poolAccountB: poolB,
                }).rpc()
            toast({
                title: "AMM Successfully Created",
                description: (
                    <div className="pr-4">
                        <p>Tx: {initializeAmmTx}</p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={() => window.open(`https://explorer.solana.com/tx/${initializeAmmTx}?cluster=devnet`, '_blank')}>
                            View on Solana Explorer <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                ),
                duration: 5000,
            });
            setAmmInitialized(true);
        }catch(e){
            console.log("Transaction Failed");
            console.log(e);
        }
        setIsInitializing(false);
    }

    const [token1Address, setToken1Address] = useState<string>("");
    const [token2Address, setToken2Address] = useState<string>("");

    return(
        <div className="p-8">
        <TooltipProvider>
            {/* Header Section */}
            <CreatePoolHeader setIsOpened={setIsOpened} ammInitialized={ammInitialized}/>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                1. Initialize Pool
            </h2>
            {poolData? 
                <PoolInformation poolData={poolData}/> 
                :
                <InitializePool 
                    initializePool={initializePool} 
                    token1Address={token1Address} 
                    token2Address = {token2Address}
                    setToken1Address = {setToken1Address}
                    setToken2Address = {setToken2Address}
                    initializeTokenCreation={initializeTokenCreation}
                    isInitializing={isInitializing}
                />
            }
            <Separator className="my-4 bg-blue-500/20" />
            <h2 className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text`}>
                2. Initialize AMM Pool
            </h2>
            {ammInitialized? 
                <Card className="flex bg-green-900/50 border border-green-500/50 px-4 py-3 text-green-300 rounded-xl mb-4 mt-3">
                    <div className="pt-0.5 -ml-0.5"><CircleCheckBig className="h-5 w-5 text-green-300" />
                    </div>
                    <p className="pl-2">AMM Has Been Initialized</p>
                </Card>
                :
                <Button 
                    onClick={initializePoolAccounts}
                    disabled = {isInitializing || poolData == null}
                    className={`w-full mt-4 bg-gradient-to-r ${(isInitializing || poolData == null)? "from-blue-500 to-cyan-600" : "from-blue-400 to-cyan-500"} hover:from-blue-500 hover:to-cyan-600 px-2 py-0.5 text-white text-md font-semibold`}>
                    Initialize AMM Pool
                </Button>
            }
            <Separator className="my-4 bg-blue-500/20" />
        </TooltipProvider>
        </div>
    )
}

/**
 * You need to create a new token feature
 * 
 * Initialize Token, you need the token addresses only
 * 
 */