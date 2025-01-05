export function parseAddress(address:string, start:number = 8, end:number = 8){
    return `${address.toString().slice(0,start)}...${address.toString().slice(address.toString().length-end, address.toString().length)}`;
}

export function parseBalance(balance:number){
    return balance/(10**9);
}

export function parseFloatDisplay(value: number): string {
    if (Number.isInteger(value)) {
      return value.toString(); // No decimals
    }
  
    const valueStr = value.toString();
    const decimalIndex = valueStr.indexOf('.');
  
    if (decimalIndex === -1) {
      return valueStr; // No decimal point found
    }
  
    const decimals = valueStr.substring(decimalIndex + 1).length;
  
    if (decimals <= 3) {
      return value.toFixed(decimals); // Keep up to the current number of decimals
    }
  
    return value.toFixed(4); // Cap at 4 decimals
}