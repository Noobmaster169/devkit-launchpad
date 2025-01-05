export const handleCopy = (text:string) => {
    navigator.clipboard.writeText(text);
};