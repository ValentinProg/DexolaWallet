export const getShortString = (text: `0x${string}` | undefined | string) => {
  return text?.slice(0, 5) + "..." + text?.slice(text.length - 5);
};

export const walletValidationHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAddress: (s: string) => void,
  setError: (s: string) => void
) => {
  setAddress(e.target.value);
  const reg = /^(0x)?[0-9a-f]{40}$/;
  if (!reg.test(String(e.target.value).toLowerCase())) {
    setError("Not a valid address");
    setTimeout(function(){
      setError("")
   }, 3000);
  } else {
    setError("");
  }
};
