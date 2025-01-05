'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { X, Repeat, PiggyBank, ArrowDownUp } from 'lucide-react'
import Image from "next/image"
import { handleCopy } from "@/utils/copy"
import { parseBalance, parseFloatDisplay } from "@/utils/parseAddress"
import PoolDashboardInformation from "@/components/PoolDashboardInformation"
import PoolDashboardActions from "@/components/PoolDashboardActions"
import DepositDisplay from "@/components/PoolDashboardDeposit";
import SwapDisplay from "@/components/PoolDashboardSwap";

const DisplayType = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
    SWAP: 'swap'
}

const token1 = "SOL";
const token2 = "USDC";


export default function PoolDashboard({setIsOpened, pool, reload}: any) {
    const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
    const onClose = ()=>{setIsOpened(false)}
    const [displayType, setDisplayType] = useState(DisplayType.SWAP)

    const [idCopied, setIdCopied] = useState(false);
    const [mintACopied, setMintACopied] = useState(false);
    const [mintBCopied, setMintBCopied] = useState(false);

    async function copy(copied:string){
        let text:string;
        if(copied === "mintA"){
            text = pool.mintA.toString();
            setMintACopied(true);
        }else if(copied === "mintB"){
            text = pool.mintB.toString();
            setMintBCopied(true);
        }else{
            text = pool.id.toString();
            setIdCopied(true);
        }
        handleCopy(text);
        await delay(500);
        setIdCopied(false);
        setMintACopied(false);
        setMintBCopied(false);
    }

    return(
      <div className="p-8">
      <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image src="/token-image.png" alt= {pool? pool.mintA.toString() : "Unknown"} layout="fill" className="rounded-full"/>
              <Image src="/solana-3d-yellow.webp" alt={pool? pool.mintB.toString(): "Unknown"} layout="fill" className="rounded-full absolute ml-6"/>
            </div>
            <span className="text-2xl font-bold text-cyan-400 pl-8">
              {pool? pool.mintA.toString().slice(0,4).toUpperCase() : "Unknown"} / {pool? pool.mintB.toString().slice(0,4).toUpperCase() : "Unknown"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpened(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-32 w-32" />
          </Button>
        </div>
        <Separator className="my-4 bg-blue-500/20" />
        {pool && <PoolDashboardInformation copy={copy} pool={pool} idCopied={idCopied} mintACopied={mintACopied} mintBCopied={mintBCopied} />} 
        {/* Action Buttons: Deposit/Swap/Withdraw */}
        <Separator className="my-4 bg-blue-500/20" />
        <PoolDashboardActions setDisplayType={setDisplayType} displayType={displayType}/>
        
        <Separator className="my-4 bg-blue-500/20" />
        {displayType === DisplayType.DEPOSIT && pool && <DepositDisplay pool={pool} reload={reload}/>}
        {displayType === DisplayType.SWAP && pool && <SwapDisplay pool={pool}/>}
        <Separator className="my-4 bg-blue-500/20" />
      </div>
    )
}
