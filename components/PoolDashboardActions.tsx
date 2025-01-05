import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Repeat, PiggyBank, ArrowDownUp } from 'lucide-react'


const DisplayType = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
    SWAP: 'swap'
}

export default function PoolDashboardActions({displayType, setDisplayType}: any) {
    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button 
            onClick={() => setDisplayType(DisplayType.SWAP)}
            className={`${displayType === DisplayType.SWAP ? "font-semibold" : ""}flex items-center justify-center bg-cyan-300 hover:bg-cyan-400 text-black`}
          >
            <Repeat className="mr-2 h-4 w-4" />
            Swap
          </Button>
          <Button 
            onClick={() => setDisplayType(DisplayType.DEPOSIT)}
            className={`${displayType === DisplayType.DEPOSIT ? "font-semibold" : ""}flex items-center justify-center bg-cyan-300 hover:bg-cyan-400 text-black`}
        >
            <PiggyBank className="mr-2 h-4 w-4" />
            Deposit
          </Button>
          <Button 
            onClick={() => setDisplayType(DisplayType.WITHDRAW)}
            className={`${displayType === DisplayType.WITHDRAW ? "font-semibold" : ""}flex items-center justify-center bg-cyan-300 hover:bg-cyan-400 text-black`}
          >
            <ArrowDownUp className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
        </div>
    )
}