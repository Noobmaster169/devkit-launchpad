import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import Image from 'next/image';
import {useState} from 'react';
import {ExternalLink} from 'lucide-react';


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

export default function DepositDisplay({pool, reload}:any) {
  const { wallet, publicKey, signTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const {toast} = useToast();
  
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");  
  const [isLoading, setIsLoading]= useState(false);

  async function deposit(){
    if(!wallet || !publicKey || !signTransaction || !anchorWallet){alert("Wallet Not Connected!");return}
    if(!anchorWallet){alert("Wallet Not Connected!");return}
    if(!pool){alert("Pool Not Found!");return}

    setIsLoading(true);
    const depositA = Math.floor(parseFloat(amountA) * 10 **9);
    const depositB = Math.floor(parseFloat(amountB) * 10 **9);
    const token1 = pool.mintA;
    const token2 = pool.mintB;

    try{
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

      const provider = new AnchorProvider(connection, anchorWallet);
      const program = new Program(IDL as AmmPool, provider);

      const depositTx = await program.methods
        .deposit(new BN(depositA), new BN(depositB))
        .accounts({
          pool: poolAccount,
          poolAuthority: poolAuthority,
          mintLiquidity: mintLiquidity,
          mintA: mintA,
          mintB: mintB,
          poolAccountA: poolA,
          poolAccountB: poolB, 
          depositor: publicKey,
          depositorAccountLiquidity: userLiquidityToken,
          depositorAccountA: userAccountA,
          depositorAccountB: userAccountB,
        }).rpc();
      toast({
          title: "Token Successfully Created",
          description: (
            <div className="pr-4">
              <p>Tx: {depositTx}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => window.open(`https://explorer.solana.com/tx/${depositTx}?cluster=devnet`, '_blank')}>
                  View on Solana Explorer <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ),
          duration: 5000,
      });
      reload();
    }catch(e){
      console.log("Transaction Failed")
    }

    setIsLoading(false);
  }
  
  return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Deposit Amount</h2>
        <Card className="flex items-center p-3 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg">
          <input type="text" value={amountA} onChange={(e)=>{setAmountA(e.target.value)}} placeholder="Deposit Amount" className="w-full bg-transparent px-1 py-1 border-none focus:ring-0 focus:outline-none"/>
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
          <Card className="flex items-center p-3 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg">
            <input type="text" value={amountB} onChange={(e)=>{setAmountB(e.target.value)}} placeholder="Deposit Amount" className="w-full bg-transparent px-1 py-1 border-none focus:ring-0 focus:outline-none"/>
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
        <Button onClick={deposit} disabled={isLoading} className={`w-full bg-gradient-to-r ${isLoading? "from-blue-700 to-cyan-600": "from-blue-600 to-cyan-500"} hover:from-blue-700 hover:to-cyan-600 text-lg text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105`}>
          Deposit Liquidity
        </Button>
      </div>
    )
}