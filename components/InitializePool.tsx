import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


export default function InitializePool({initializePool, token1Address, setToken1Address, token2Address, setToken2Address, initializeTokenCreation, isInitializing }:any){
    return(
        <div className="mt-3">
            {/* Input Section for Token 1 */}
            <p className="text-xs font-normal py-1 mt-2 text-white">Pool Token 1:</p>
            <Card className="flex flex-row p-2 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg text-sm">
                <input type="text" value={token1Address} onChange={(e)=>{setToken1Address(e.target.value)}} placeholder="Token Address" className="w-full bg-transparent px-1 py-1 border-none focus:ring-0 focus:outline-none"/>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button 
                            onClick={()=>{initializeTokenCreation(1)}}
                            className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 px-2 py-0.5 text-white text-xs font-semibold">
                            New Token
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-cyan-900 text-white border-cyan-700">
                        <p className="text-xs">Click to create new token</p>
                    </TooltipContent>
                </Tooltip>
            </Card>
            {/* Input Section for Token 2 */}
            <p className="text-xs font-normal py-1 mt-2 text-white">Pool Token 2:</p>
            <Card className="flex flex-row p-2 bg-[#0A1A3B]/60 border border-blue-500/20 rounded-lg text-sm">
                <input type="text" value={token2Address} onChange={(e)=>{setToken2Address(e.target.value)}} placeholder="Token Address" className="w-full bg-transparent px-1 py-1 border-none focus:ring-0 focus:outline-none"/>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button 
                            onClick={()=>{initializeTokenCreation(2)}}
                            className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 px-2 py-0.5 text-white text-xs font-semibold">
                            New Token
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-cyan-900 text-white border-cyan-700">
                        <p className="text-xs">Click to create new token</p>
                    </TooltipContent>
                </Tooltip>
            </Card>
            {/* Anchor Function Call to Initialize New Pool */}
            <Button 
                onClick={initializePool}
                disabled = {isInitializing}
                className={`w-full mt-4 bg-gradient-to-r ${isInitializing? "from-blue-500 to-cyan-600" : "from-blue-400 to-cyan-500"} hover:from-blue-500 hover:to-cyan-600 px-2 py-0.5 text-white text-md font-semibold`}>
                Initialize Pool
            </Button>
        </div>
    )
}