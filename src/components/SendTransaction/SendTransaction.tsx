import styles from "./SendTransaction.module.scss";
import { useDebounce } from "../../helpers/useDebounce";
import { useState } from "react";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import Button from "../Button/Button";
import { walletValidationHandler } from "../../helpers/helpers";
import { useAccount } from "wagmi";

export const SendTransaction = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [validationError, setValidationError] = useState("");
  const [amount, setAmount] = useState("");
  const { isConnected } = useAccount();
  const debouncedTo = useDebounce(walletAddress, 500);
  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
  });
  const { data, sendTransaction } = useSendTransaction(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form
      className={styles.SendTransactionForm}
      onSubmit={(e) => {
        e.preventDefault();
        sendTransaction?.();
      }}
    >
      <input
        className={styles.input}
        aria-label="Recipient"
        onChange={(e) =>
          walletValidationHandler(e, setWalletAddress, setValidationError)
        }
        placeholder="Enter your wallet adress"
        value={walletAddress}
        disabled={!isConnected || isLoading}
      />
      <input
        className={styles.input}
        aria-label="Amount (ether)"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
        value={amount}
        type="number"
        disabled={!isConnected || isLoading}
      />
      <div className={styles.validationError}>{validationError}</div>
      <Button disabled={!isConnected || isLoading}>
        {isLoading ? <ButtonSpinner /> : "Send"}
      </Button>

      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {walletAddress}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
};
