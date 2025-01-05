"use client";
import { GradientText } from '@/components/gradient-text'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Zap, Rocket, RefreshCw, Icon } from 'lucide-react'
import { GradientBlob } from '@/components/gradient-blob'
import { Separator } from '@/components/ui/separator';
import { Modal } from '@/components/Modal';
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from "react";
import PoolDashboard from '@/components/PoolDashboard';
import CreatePool from '@/components/CreatePool';
import CreateToken from '@/components/CreateToken';
import PoolCard from '@/components/PoolCard';
import { Plus } from 'lucide-react';
import IDL from '@/anchor/idl/amm_pool.json'
import { AmmPool } from '@/anchor/types/amm_pool';
import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';
import { Program } from "@coral-xyz/anchor";
import { set } from '@coral-xyz/anchor/dist/cjs/utils/features';
import {getAssociatedTokenAddressSync}  from "@solana/spl-token";
import { PoolData } from '@/utils/interface';

const programId = new PublicKey(IDL.address);
const RPC_LINK = process.env.NEXT_PUBLIC_RPC_LINK ? process.env.NEXT_PUBLIC_RPC_LINK : clusterApiUrl("devnet");
const connection = new Connection(RPC_LINK);
const program = new Program(IDL as AmmPool, {connection});


export default function LandingPage() {
    const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
    const RPC_LINK = process.env.NEXT_PUBLIC_RPC_LINK ? process.env.NEXT_PUBLIC_RPC_LINK : clusterApiUrl("devnet");
    const connection = new Connection(RPC_LINK);
    const program = new Program(IDL as AmmPool, {connection});

    const [displayNavbar, setDisplayNavbar] = useState(false);
    const [creatingPool, setCreatingPool] = useState(false);
    const [creatingToken, setCreatingToken] = useState(false);
    const [tokenAddressUpdate, setTokenAddressUpdate] = useState<Function>(()=>{});

    const [loadingPools, setLoadingPools] = useState(true);
    const [pools, setPools] = useState<PoolData[]>([]);
    const [newPool, setNewPool] = useState(false);
    const [openedPool, setOpenedPool] = useState<PoolData | null>(null);

    function openPool(index:number){
        setOpenedPool(pools[index]);
        //setDisplayNavbar(!displayNavbar);
        setDisplayNavbar(true);
        setCreatingPool(false);

    }
    function createPool(){
        setCreatingPool(true);
        setDisplayNavbar(false);
    }
    async function reload(){
        const pool:boolean = newPool;
        setNewPool(!pool);
        await delay(30000);
        setNewPool(pool);
    }

    async function getPools(){
        setLoadingPools(true);
        console.log("Getting Pools");
        console.log("Program ID:", programId);

        // Get Program Accounts of all AMMs in the Smart Contract
        const pools = await connection.getProgramAccounts(programId);
        console.log(pools.map(pool => pool.pubkey.toString()));
        
        // Decode Raw Data to Pool Data
        const poolsData : PoolData[] = pools.map((pool) => {
            const data = program.account.pool.coder.accounts.decode('pool', pool.account.data);
            return{
                id: data.id,
                accountInitialized: data.accountInitialized,
                mintA: data.mintA,
                mintB: data.mintB
            };
        });

        // Filter Pool that hasn't been initialized to AMM
        const ammData = poolsData.filter(pool => pool.accountInitialized);
        //const ammData = poolsData;
        console.log(ammData);

        const tokenAccounts: PublicKey[] = [];
        ammData.forEach(async (pool: PoolData) => {
            const [poolAuthority,] = PublicKey.findProgramAddressSync([pool.id.toBuffer(), pool.mintA.toBuffer(), pool.mintB.toBuffer(), Buffer.from('authority')], programId);
            
            const poolTokenA = getAssociatedTokenAddressSync(pool.mintA, poolAuthority, true);
            const poolTokenB = getAssociatedTokenAddressSync(pool.mintB, poolAuthority, true);
            pool["tokenAccountA"] = poolTokenA;
            pool["tokenAccountB"] = poolTokenB;
            tokenAccounts.push(poolTokenA);
            tokenAccounts.push(poolTokenB);
        })

        // Search the balances of each tokens in all Pools
        const balances: any = {};
        // Get the pool account Infos
        const poolTokenAccounts = await connection.getMultipleAccountsInfo(tokenAccounts);
        if(!poolTokenAccounts){console.log("No Pool Found");return;}
        // Decode the data to find the balance
        poolTokenAccounts.forEach((account, index) => {
            const balance = account?.data.slice(64, 72).readBigUInt64LE();
            balances[tokenAccounts[index].toString()] = balance? parseInt(balance.toString()) : 0;
        });
        
        console.log(balances);

        ammData.forEach((pool: PoolData) => {
            pool["balanceA"] = balances[pool.tokenAccountA?.toString() as string];
            pool["balanceB"] = balances[pool.tokenAccountB?.toString() as string];
        })
        console.log(ammData);

        setPools(ammData);
        setLoadingPools(false);
    }

    async function setTokenUpdatingFunction(f:Function){
        setTokenAddressUpdate(f);
    }

    useEffect(()=>{
        getPools();
    }, [newPool])

  return (
    <main className="w-full">
    <div className="w-full flex flex-row justify-end">
        {/* Pool Section */}
        <div className={`${(displayNavbar|| creatingPool)? "max-lg:hidden":""} min-h-screen text-white flex-grow flex flex-col items-center`}>
            <div className="w-full pt-32 p-7 px-16">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-3xl py-1 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text -mb-3">
                        AMM Liquidity Pools 
                    </h1>
                    <Button onClick={()=>{createPool()}} className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 py-5 text-white">
                        <div className="flex items-center justify-start justify-items-start">
                            <Plus strokeWidth={3}/>
                            <p className="pl-1.5 pt-0.5 pr-4 text-lg">Create Pool</p>
                        </div>
                    </Button>
                </div>
                <Separator className="my-4 bg-blue-500/20" />
                <div className={`grid grid-cols-1 pt-4
                    ${(displayNavbar|| creatingPool)? "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3": "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" }
                gap-6`}>
                {pools.map((pool, key) => (
                    <div key={key}>
                        <PoolCard openPool={()=>{openPool(key)}} pool={pool}/>    
                    </div>
                ))}
                </div>
            </div>
        </div>
        {/* Side Panel */} 
        <div className={` min-h-screen bg-gray-900 flex flex-col mt-24 ${(displayNavbar||creatingPool) ? 'translate-x-0  w-[500px]' : 'translate-x-full'} transform transition-transform duration-300 ease-in-out`}>
            <div className={`${displayNavbar? "" : "hidden"}`}>
                <PoolDashboard setIsOpened={setDisplayNavbar} pool={openedPool} reload={reload}/>
            </div>
            <div className={`${creatingPool? "" : "hidden"}`}>
                <CreatePool setIsOpened={setCreatingPool} creatingToken={creatingToken} setCreatingToken={setCreatingToken} setTokenUpdatingFunction={setTokenUpdatingFunction} setNewPool={setNewPool}/>
            </div>
        </div>
    </div>
    {/* Create Token Modal */}
    <Modal isOpen={creatingToken} onClose={() => setCreatingToken(false)}>
        <CreateToken tokenAddressUpdate={tokenAddressUpdate} onClose={() => setCreatingToken(false)}/>
    </Modal>
    </main>
  );
};