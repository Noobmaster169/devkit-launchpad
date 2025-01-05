import { useEffect, useState } from "react";
import {PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import { CircleCheckBig } from "lucide-react";
import { handleCopy } from "@/utils/copy";
import { Card } from "@/components/ui/card";
import {AnchorProvider, Program} from "@coral-xyz/anchor";
import IDL from '@/anchor/idl/amm_pool.json'
import {AmmPool} from '@/anchor/types/amm_pool';
import {useWallet, useAnchorWallet} from "@solana/wallet-adapter-react";

interface PoolData{
    id: PublicKey;
    accountInitialized: boolean;
    mintA: PublicKey;
    mintB: PublicKey;
}

const RPC_LINK = process.env.NEXT_PUBLIC_RPC_LINK ? process.env.NEXT_PUBLIC_RPC_LINK : clusterApiUrl("devnet");
const connection = new Connection(RPC_LINK);
const programId = new PublicKey(IDL.address);

export default function PoolInformation({poolData}: {poolData:PoolData}){
    const { wallet, publicKey, signTransaction } = useWallet();
    const anchorWallet = useAnchorWallet();
    
    const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
    const [idIsCopied, setIdIsCopied] = useState(false);
    const [mintAIsCopied, setMintAIsCopied] = useState(false);
    const [mintBIsCopied, setMintBIsCopied] = useState(false);

    // async function fetchInformation(){
    //     if(!anchorWallet){return;}
    //     const provider = new AnchorProvider(connection, anchorWallet);
    //     const program = new Program(IDL as AmmPool, provider);
    //     const [poolAccount,] = PublicKey.findProgramAddressSync([poolData.id.toBuffer(), poolData.mintA.toBuffer(), poolData.mintB.toBuffer()], programId);
    //     console.log("Pool Account:", poolAccount.toString());

    //     let pool = await program.account.pool.fetch(poolAccount);
    //     console.log(pool);
    //     console.log(poolData.id.toString());
    //     console.log(poolData.mintA.toString());
    //     console.log(poolData.mintB.toString());
    //     console.log("Fetching Using Connection");
    //     let poolAccountInfo = await connection.getAccountInfo(poolAccount);
    //     console.log(poolAccountInfo);
    //     console.log("Owner:", poolAccountInfo?.owner.toString());
    //     console.log("Found?")
    // }
    // useEffect(()=>{
    //     console.log("Fetching Pool Information");
    //     fetchInformation();
    // })
    
    async function copy(copied:string){
        let text:string;
        if(copied === "mintA"){
            text = poolData.mintA.toString();
            setMintAIsCopied(true);
        }else if(copied === "mintB"){
            text = poolData.mintB.toString();
            setMintBIsCopied(true);
        }else{
            text = poolData.id.toString();
            setIdIsCopied(true);
        }
        handleCopy(text);
        await delay(500);
        setIdIsCopied(false);
        setMintAIsCopied(false);
        setMintBIsCopied(false);
    }
    
    return(
        <div className="mt-3">
            <Card className="flex bg-green-900/50 border border-green-500/50 px-4 py-3 text-green-300 rounded-xl mb-4">
                <div className="pt-0.5 -ml-0.5"><CircleCheckBig className="h-5 w-5 text-green-300" />
                </div>
                <p className="pl-2">Pool Has Been Initialized</p>
            </Card>
            <div className="mt-2 mb-4">
                <div className="text-sm font-normal text-white">Pool ID:</div> 
                <div className="font-normal text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("id")}}>
                    {idIsCopied? "Copied!" : poolData.id.toString()}
                </div> 
            </div>
            <div className="mt-2 mb-4">
                <div className="text-sm font-normal text-white">Pool Token 1:</div> 
                <div className="font-normal text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("mintA")}}>
                    {mintAIsCopied? "Copied!" : poolData.mintA.toString()}
                </div> 
            </div>
            <div className="mt-2 mb-4">
                <div className="text-sm font-normal text-white">Pool Token 2:</div> 
                <div className="font-normal text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("mintB")}}>
                    {mintBIsCopied? "Copied!" : poolData.mintB.toString()}
                </div> 
            </div>
        </div>  
    )
}