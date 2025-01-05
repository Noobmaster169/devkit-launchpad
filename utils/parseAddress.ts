export function parseAddress(address:string, start:number = 8, end:number = 8){
    return `${address.toString().slice(0,start)}...${address.toString().slice(address.toString().length-end, address.toString().length)}`;
}

export function parseBalance(balance:number){
    return balance/(10**9);
}