import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import { useWeb3Modal } from "@web3modal/react";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";
import { getShortString } from "../../helpers/helpers";
import Button from "../Button/Button";

const ConnectButton = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const { isOpen, open } = useWeb3Modal();

  // const buttonInfo = `${data?.formatted.slice(0, 4)} ${getShortString(
  //   address
  // )}`;

  const walletCheck = data?.formatted.slice(0, 4)

  return (
    <>
      <Button onClick={() => open()}>
        {address === undefined ? (
          <>{isOpen ? <ButtonSpinner /> : "Connect"}</>
        ) : (
          <>
            <span>{walletCheck}</span>
            <span>{getShortString(address)}</span>
          </>
        )}
      </Button>
    </>
  );
};

export default ConnectButton;
