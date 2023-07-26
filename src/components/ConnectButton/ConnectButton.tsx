import styles from "./ConnectButton.module.scss";
import { useWeb3Modal } from "@web3modal/react";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";
import Copy from "../../assets/clone.svg";
import { getShortString } from "../../helpers/helpers";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";




const ConnectButton = () => {
  const { data } = useBalance({
    address: "0x425eE0891B9415fbe660aF2146e0e15a1F113A43",
  });

  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  //  console.log(`Is connect: ${isConnecting}`);
  //  console.log(`Disconect: ${isDisconnected}`);
  console.log(`isConnecting : ${isConnecting}`);
  console.log(`isConnected : ${isConnected}`);
  // console.log(`isDisconnected : ${isDisconnected}`);


  
  const buttonInfo = `${data?.formatted}${data?.symbol} ${getShortString(
    address
  )}`;

  return (
    //     <>
    //       <button className={styles.button} onClick={() => open()}>
    //         {address === undefined ?
    //         "Connect"
    //         :
    //         <>
    //         {buttonInfo}
    //         <CopyToClipboard text={address}>
    //           <img src={Copy} alt="Copy" onClick={(e) => e.stopPropagation()}/>
    //         </CopyToClipboard>
    //         </>
    // }
    //       </button>
    //     </>

    <>
      <button className={styles.button} onClick={() => open()}>
        {address === undefined 
        ? 
        (
          <>{isConnecting === false ? "Connect" : <ButtonSpinner />}</>
        ) 
        : 
        (
          <>
            {buttonInfo}
            <img
              src={Copy}
              alt="Copy"
              onClick={(e) =>
                e.stopPropagation(navigator.clipboard.writeText(address))
              }
            />
          </>
        )}
      </button>
    </>
  );
};

export default ConnectButton;
