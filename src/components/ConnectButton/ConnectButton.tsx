import styles from "./ConnectButton.module.scss";
import Copy from "../../assets/clone.svg";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import { useWeb3Modal } from "@web3modal/react";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";
import { getShortString } from "../../helpers/helpers";
import { useCopyToClipboard } from "../../helpers/useCopyToClipboard";

const ConnectButton = () => {
  const { data } = useBalance({
    address: "0x425eE0891B9415fbe660aF2146e0e15a1F113A43",
  });

  const { isOpen, open } = useWeb3Modal();
  const { address } = useAccount();


  const [value, copy] = useCopyToClipboard();

  // console.log(value);

  const buttonInfo = `${data?.formatted.slice(0, 4)} ${getShortString(
    address
  )}`;

  return (
    <>
      <button className={styles.button} onClick={() => open()}>
        {address === undefined ? (
          <>{isOpen ? <ButtonSpinner /> : "Connect"}</>
        ) : (
          <>
            <span>{buttonInfo}</span>
            <button
              className={styles.copyButton}
              onClick={(e) => e.stopPropagation()}
            >
              {/* <img src={Copy} alt="Copy" onClick={() => copy(address)} /> */}
            </button>
          </>
        )}
      </button>
    </>
  );
};

export default ConnectButton;
