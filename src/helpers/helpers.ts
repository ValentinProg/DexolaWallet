export const getShortString = (text: `0x${string}` | undefined | string) => {
    return text?.slice(0, 5) + "..." + text?.slice(text.length - 5);
}


