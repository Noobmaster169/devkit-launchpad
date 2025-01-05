import { Card } from "@/components/ui/card"
import Image from "next/image"
import { handleCopy } from "@/utils/copy"
import { parseAddress, parseBalance } from "@/utils/parseAddress"


export default function PoolDashboardInformation({copy, pool, idCopied, mintACopied, mintBCopied}:any){
    
    return(
        <div className="space-y-2 mb-4">
            <h2 className="text-xl font-semibold text-white">Pool Information:</h2>
            {/* Pool ID */}
            <div className="flex items-center space-x-1 mb-2">
                <p className="text-lg font-semibold text-white">ID:</p>
                <div className="font-semibold text-lg text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("id")}}>
                    {idCopied? "Copied!" : parseAddress(pool.id.toString(), 30, 0)}
                </div> 
            </div>
            {/* Token 1 */}
            <Card className="bg-[#0A1A3B]/60 hover:bg-[#001031]/70 p-4 rounded-lg w-full">
                <div className="flex items-center space-x-2 mb-2">
                    <Image src="/token-image.png" alt={pool.mintA.toString()} width={32} height={32} className="rounded-full"/>
                    <div>
                        <div className="text-xs font-semibold">Token 1:</div>
                        <div className="font-normal font-semibold text-sm text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("mintA")}}>
                            {mintACopied? "Copied!" : parseAddress(pool.mintA.toString(), 25,10)}
                        </div>
                    </div>
                </div>
                <div className="flex items-center  space-x-1">
                    <p className="text-lg font-semibold text-white">Balance:</p>
                    <p className="text-lg font-semibold text-cyan-300">{pool.balanceA? parseBalance(pool.balanceA) : 0}</p>
                </div>
            </Card>
            {/* Token 2 */}
            <Card className="bg-[#0A1A3B]/60 hover:bg-[#001031]/70 p-4 rounded-lg w-full">
                <div className="flex items-center space-x-2 mb-2">
                    <Image src="/solana-3d-yellow.webp" alt={pool.mintB.toString()} width={32} height={32} className="rounded-full"/>
                    <div>
                        <div className="text-xs font-semibold">Token 2:</div>
                        <div className="font-normal font-semibold text-sm text-cyan-300 hover:text-cyan-400" onClick={()=>{copy("mintB")}}>
                            {mintBCopied? "Copied!" : parseAddress(pool.mintB.toString(), 25,10)}
                        </div> 
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <p className="text-lg font-semibold text-white">Balance:</p>
                    <p className="text-lg font-semibold text-cyan-300">{pool.balanceB? parseBalance(pool.balanceB) : 0}</p>
                </div>
            </Card>
        </div>
    )
}