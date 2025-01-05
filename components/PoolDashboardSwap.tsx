import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { parseBalance, parseFloatDisplay } from "@/utils/parseAddress"
import {useWallet, useAnchorWallet} from "@solana/wallet-adapter-react";
import {PublicKey, Connection, clusterApiUrl, Keypair} from "@solana/web3.js";
import {Program, AnchorProvider, BN} from "@coral-xyz/anchor";
import IDL from '@/anchor/idl/amm_pool.json'
import {AmmPool} from '@/anchor/types/amm_pool';
import { useToast } from "@/components/hooks/use-toast"
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

const RPC_LINK = process.env.NEXT_PUBLIC_RPC_LINK ? process.env.NEXT_PUBLIC_RPC_LINK : clusterApiUrl("devnet");
const connection = new Connection(RPC_LINK);
const programId = new PublicKey(IDL.address);

export default function SwapDisplay({ pool }:any) {
    const { wallet, publicKey, signTransaction } = useWallet();
    const anchorWallet = useAnchorWallet();
    const {toast} = useToast();

    const [swapAmount, setSwapAmount] = useState<number>(0);
    const [isTokenA, setIsTokenA] = useState(true);
    const [swapRate, setSwapRate] = useState(getSwapRate(true));

    const [isLoading, setIsLoading]= useState(false);
  
    function getSwapRate(isTokenA: boolean){
      let balanceA = pool.balanceA ? parseInt(pool.balanceA.toString()) : 0;
      let balanceB = pool.balanceA ? parseInt(pool.balanceB.toString()) : 0;
      
      if(isTokenA){
        if(balanceA == 0){
          balanceA = 1;
        }
        return balanceB / balanceA;
      }
      else{
        if(balanceB == 0){
          balanceB = 1;
        }
        return balanceA / balanceB;
      }
    }
  
    function getSwapResult(isTokenA: boolean, amount:number){
      const taxedInput = amount * 0.99;
      let balanceA = pool.balanceA ? parseInt(pool.balanceA.toString())/(10**9) : 0;
      let balanceB = pool.balanceA ? parseInt(pool.balanceB.toString())/(10**9) : 0;
      
      if(isTokenA){
        if(balanceA == 0 && taxedInput == 0){balanceA = 1;}
        return taxedInput * balanceB / (balanceA + taxedInput);
      }
      else{
        if(balanceB == 0 && taxedInput == 0){balanceB = 1;}
        return taxedInput * balanceA / (balanceB + taxedInput);
      }
    }
  
    function getPriceChangePercentage(isTokenA:boolean, input:number){
      const output = getSwapResult(isTokenA, input);
  
      const originalRate = getSwapRate(isTokenA);
      const newRate = input/output;
  
      return newRate/originalRate*100;
    }
  
    function handleSwapAmountChange(e: any){
      console.log("Swap Amount Changed");
      let amount = parseFloat(e.target.value);
      if (amount < 0) { amount = -amount;}
      if (isNaN(amount)) {
        amount = 0;
      }
      console.log("Swap Amount Updated:", amount);
      setSwapAmount(amount);
    }
  
    async function swap(){
        if(!wallet || !publicKey || !signTransaction || !anchorWallet){alert("Wallet Not Connected!");return}
        if(!anchorWallet){alert("Wallet Not Connected!");return}
        if(!pool){alert("Pool Not Found!");return}
        if(swapAmount <0){alert("Invalid Amount!");return}

        console.log("Swapping Token");

        setIsLoading(true);
        const amount = Math.floor(swapAmount * 10 **9);
        const minimumOutput = Math.floor(getSwapResult(isTokenA, swapAmount) * 0.99 * 10 **9);
        const token1 = pool.mintA;
        const token2 = pool.mintB;

        try{
            console.log("Starting Fetching Accounts")
            const POOL_ID = pool.id;
            const [poolAccount, bump] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer()], programId);
            const [poolAuthority,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer(), Buffer.from('authority')], programId);
            const [mintLiquidity,] = PublicKey.findProgramAddressSync([POOL_ID.toBuffer(), token1.toBuffer(), token2.toBuffer(), Buffer.from('liquidity')], programId);
            const mintA = token1;
            const mintB = token2;
            const poolA = getAssociatedTokenAddressSync(token1, poolAuthority, true);
            const poolB = getAssociatedTokenAddressSync(token2, poolAuthority, true);
    
            const userAccountA = getAssociatedTokenAddressSync(token1, publicKey, true);
            const userAccountB = getAssociatedTokenAddressSync(token2, publicKey, true);
            const userLiquidityToken = getAssociatedTokenAddressSync(mintLiquidity, publicKey, true);

            console.log("Initializing Provider");

            const provider = new AnchorProvider(connection, anchorWallet);
            const program = new Program(IDL as AmmPool, provider);
            console.log("Swapping")

            const swapTx = await program.methods
                .swap(isTokenA, new BN(amount), new BN(minimumOutput))
                .accounts({
                    pool: poolAccount,
                    poolAuthority: poolAuthority,
                    trader: publicKey,
                    mintA: mintA,
                    mintB: mintB,
                    poolAccountA: poolA,
                    poolAccountB: poolB,
                    traderAccountA: userAccountA,
                    traderAccountB: userAccountB,
                }).rpc();
            toast({
                title: "Swap Successful",
                description: (
                    <div className="pr-4">
                    <p>Tx: {swapTx}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => window.open(`https://explorer.solana.com/tx/${swapTx}?cluster=devnet`, '_blank')}>
                        View on Solana Explorer <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    </div>
                ),
                duration: 5000,
            });
        }catch(e){
            console.log("Transaction Failed")
            console.log(e);
        }
        setIsLoading(false);
    }
  
    return (
      <div className="space-y-3">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Swap Token</h2>
      <div>
          <p className="text-sm text-blue-300 mb-2">You will transfer</p>
          <Card className="flex items-center p-3 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg">
              <input type="text" value={swapAmount} onChange={(e)=>{handleSwapAmountChange(e)}} placeholder="Deposit Amount" className="w-full bg-transparent px-1 py-1 border-none focus:ring-0 focus:outline-none"/>
              <div className="flex w-[130px] items-center ml-2 bg-blue-500/20 rounded-full px-3 py-2">
                  <Image
                  src="/token-image.png"
                  alt={pool.mintA.toString()}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                  />
                  <span className="text-blue-300">{pool.mintA.toString().slice(0,4).toUpperCase()}</span>
              </div>
            </Card>
      </div>
      <div>
          <p className="text-sm text-blue-300 mb-2">You will receive</p>
          <Card className="flex items-center p-3 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg">
              <div className="w-full bg-transparent px-1 py-1 border-none focus:ring-0 focus:outline-none">{getSwapResult(isTokenA, swapAmount)}</div>
              <div className="flex w-[130px] items-center ml-2 bg-blue-500/20 rounded-full px-3 py-2">
                  <Image
                  src="/solana-3d-yellow.webp"
                  alt={pool.mintB.toString()}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                  />
                  <span className="text-blue-300">{pool.mintB.toString().slice(0,4).toUpperCase()}</span>
              </div>
            </Card>
      </div>
      <Card className="flex items-center p-3 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg mb-2">
        <p className="text-white">Price Impact: <span className="font-semibold text-cyan-400">{parseFloatDisplay(getPriceChangePercentage(isTokenA, swapAmount))}%</span></p>
      </Card>
      <Button disabled={isLoading} onClick={swap} className={`w-full bg-gradient-to-r ${isLoading? "from-blue-700 to-cyan-600": "from-blue-600 to-cyan-500"} hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105`}>
          Swap Token
      </Button>
      </div>
    )
  }
  
    