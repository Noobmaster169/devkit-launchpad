import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {Button} from '@/components/ui/button';
import Image from "next/image";
import {parseAddress, parseBalance} from '@/utils/parseAddress';
import {useState} from "react";
import { handleCopy } from '@/utils/copy';

export default function PoolCard({openPool, pool}:any){
    const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
    const token1 = pool.mintA.toString().slice(0, 4).toUpperCase();
    const token2 = pool.mintB.toString().slice(0, 4).toUpperCase();

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
        <Card className="bg-[#0A1A3B]/40 hover:bg-[#001031]/40 backdrop-blur-sm border border-blue-500/20 p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-12 h-12">
                <Image
                    src="/token-image.png"
                    alt={pool.mintA.toString()}
                    layout="fill"
                    className="rounded-full"
                />
                <Image
                    src="/solana-3d-yellow.webp"
                    alt={pool.mintB.toString()}
                    layout="fill"
                    className="rounded-full absolute ml-6"
                />
                </div>
                <span className="text-2xl font-bold text-cyan-400 pl-6">{token1}/{token2}</span>
            </div>
            <div className="space-y-2 mb-4">
                <div className=" ml-3 flex items-center space-x-1 mb-2">
                    <p className="text-md font-semibold text-white">ID:</p>
                    <div className="font-semibold text-md text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("id")}}>
                        {idCopied? "Copied!" : parseAddress(pool.id.toString(), 20,0)}
                    </div> 
                </div>
                <Card className="bg-[#0A1A3B]/60 hover:bg-[#001031]/70 p-4 rounded-lg w-full">
                    <div className="flex items-center space-x-2 mb-2">
                        <Image
                        src="/token-image.png"
                        alt={pool.mintA.toString()}
                        width={32}
                        height={32}
                        className="rounded-full"
                        />
                        <div>
                        <div className="text-xs font-semibold">Token 1:</div>
                        <div className="font-normal font-semibold text-sm text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("mintA")}}>
                            {mintACopied? "Copied!" : parseAddress(pool.mintA.toString(), 8,8)}
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center  space-x-1">
                        <p className="text-lg font-semibold text-white">Balance:</p>
                        <p className="text-lg font-semibold text-cyan-300">{pool.balanceA? parseBalance(pool.balanceA) : 0}</p>
                    </div>
                </Card>
                <Card className="bg-[#0A1A3B]/60 hover:bg-[#001031]/70 p-4 rounded-lg w-full">
                    <div className="flex items-center space-x-2 mb-2">
                        <Image
                        src="/solana-3d-yellow.webp"
                        alt={pool.mintB.toString()}
                        width={32}
                        height={32}
                        className="rounded-full"
                        />
                        <div>
                            <div className="text-xs font-semibold">Token 2:</div>
                            <div className="font-normal font-semibold text-sm text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("mintB")}}>
                                {mintBCopied? "Copied!" : parseAddress(pool.mintB.toString(), 8,8)}
                            </div> 
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <p className="text-lg font-semibold text-white">Balance:</p>
                        <p className="text-lg font-semibold text-cyan-300">{pool.balanceB? parseBalance(pool.balanceB) : 0}</p>
                    </div>
                </Card>
            </div>
            <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-lg font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                onClick={()=>{openPool();}}
            >
                Open Pool
            </Button>
        </Card>   
    )
}



/*
    return(
        <Card className="bg-[#0A1A3B]/40 backdrop-blur-sm border border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative w-16 h-8">
            <Image
              src={`/${token1.name.toLowerCase()}-logo.png`}
              alt={token1.name}
              layout="fill"
              className="rounded-full"
            />
            <Image
              src={`/${token2.name.toLowerCase()}-logo.png`}
              alt={token2.name}
              layout="fill"
              className="rounded-full absolute left-8"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text pl-8">
            {token1.name} / {token2.name}
          </span>
        </div>

        <div className="space-y-4 mb-4">
          <TokenInfo
            label="Pool ID"
            value={poolId}
            copyField="poolId"
            copiedField={copiedField}
            onCopy={handleCopy}
          />
          <TokenInfo
            label={`${token1.name} (Balance: ${token1.balance})`}
            value={token1.address}
            copyField="token1"
            copiedField={copiedField}
            onCopy={handleCopy}
          />
          <TokenInfo
            label={`${token2.name} (Balance: ${token2.balance})`}
            value={token2.address}
            copyField="token2"
            copiedField={copiedField}
            onCopy={handleCopy}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          onClick={openPool}
        >
          Open Pool
        </Button>
      </CardFooter>
    </Card>
    )
}


interface TokenInfoProps {
    label: string
    value: string
    copyField: string
    copiedField: string | null
    onCopy: (text: string, field: string) => void
  }
function TokenInfo({ label, value, copyField, copiedField, onCopy }: TokenInfoProps) {
    return (
      <div>
        <p className="text-sm text-cyan-400">{label}:</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="font-normal text-sm text-white hover:text-cyan-300 cursor-pointer" 
                onClick={() => onCopy(value, copyField)}
              >
                {copiedField === copyField ? "Copied!" : parseAddress(value, 8, 8)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to copy full address</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }
*/