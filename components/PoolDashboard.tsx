'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'
import Image from "next/image"
import { handleCopy } from "@/utils/copy"
import { parseBalance } from "@/utils/parseAddress"
import PoolDashboardInformation from "@/components/PoolDashboardInformation"
import DepositDisplay from "@/components/PoolDashboardDeposit";

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
    const [displayType, setDisplayType] = useState(DisplayType.DEPOSIT)

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
        <Separator className="my-4 bg-blue-500/20" />
        <div className="space-y-4 mb-6">
              <Select onValueChange={(value) => setDisplayType(value)}>
              <SelectTrigger className="bg-[#0A1A3B] border-blue-500/50 text-blue-300">
                  <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A1A3B] border-blue-500/50">
                  <SelectItem value={DisplayType.DEPOSIT}>Deposit</SelectItem>
                  <SelectItem value={DisplayType.WITHDRAW}>Withdraw</SelectItem>
                  <SelectItem value={DisplayType.SWAP}>Swap</SelectItem>
              </SelectContent>
              </Select>
          </div>
          {displayType === DisplayType.DEPOSIT && pool && <DepositDisplay pool={pool} reload={reload}/>}
          {displayType === DisplayType.SWAP && pool && <SwapDisplay token1={token1} token2={token2} />}
        <Separator className="my-4 bg-blue-500/20" />
      </div>
    )
}

function SwapDisplay({ token1, token2 }:any) {
return (
    <div className="space-y-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Swap Token</h2>
    <div>
        <p className="text-sm text-blue-300 mb-2">You will transfer</p>
        <TokenInput token={token1} />
    </div>
    <div>
        <p className="text-sm text-blue-300 mb-2">You will receive</p>
        <TokenInput token={token2} />
    </div>
    <div>
        <p className="text-sm text-blue-300 mb-2">Liquidity Slippage</p>
        <Select>
        <SelectTrigger className="bg-[#0A1A3B] border-blue-500/50 text-blue-300">
            <SelectValue placeholder="Select slippage" />
        </SelectTrigger>
        <SelectContent className="bg-[#0A1A3B] border-blue-500/50">
            <SelectItem value="1">1%</SelectItem>
            <SelectItem value="2.5">2.5%</SelectItem>
            <SelectItem value="5">5%</SelectItem>
            <SelectItem value="10">10%</SelectItem>
        </SelectContent>
        </Select>
    </div>
    <p className="text-cyan-400">Price Impact: <span className="font-semibold">15%</span></p>
    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
        Swap Token
    </Button>
    </div>
)
}

function TokenInput({ token }:any) {
return (
    <Card className="flex items-center p-2 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg">
    <Input type="number" placeholder="0.00" className="border-0 bg-transparent text-white focus:ring-0" />
    <div className="flex items-center ml-2 bg-blue-500/20 rounded-full px-3 py-1">
        <Image
        src={`/placeholder.svg?height=24&width=24&text=${token}`}
        alt={token}
        width={24}
        height={24}
        className="rounded-full mr-2"
        />
        <span className="text-blue-300">{token}</span>
    </div>
    </Card>
)
}

  