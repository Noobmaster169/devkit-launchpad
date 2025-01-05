import { PublicKey } from '@solana/web3.js';

export interface PoolData{
    id: PublicKey;
    accountInitialized: boolean;
    mintA: PublicKey;
    mintB: PublicKey;
    tokenAccountA?: PublicKey;
    tokenAccountB?: PublicKey;
    balanceA?: number;
    balanceB?: number;
}