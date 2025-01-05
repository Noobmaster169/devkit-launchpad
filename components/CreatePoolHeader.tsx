import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, X } from "lucide-react"

export default function CreatePoolHeader({setIsOpened, ammInitialized}: any){
    return(
    <>
    <div className="flex justify-between items-center mb-5">
        <div className="flex items-center space-x-2">
            <span className="text-2xl font-semibold bg-gradient-to-r from-blue-300 to-cyan-500 text-transparent bg-clip-text">
                Create New Liquidity Pool
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
    {ammInitialized? "": <Card className="flex bg-red-900/50 border border-red-500/50 px-4 py-3 text-red-300 rounded-xl mb-6">
        <div className="pt-0.5 -ml-0.5"><AlertCircle className="h-5 w-5 text-red-300" />
        </div>
        <p className="pl-2">Don't exit the page until AMM Creation is completed</p>
    </Card>}
    </>
    )
}