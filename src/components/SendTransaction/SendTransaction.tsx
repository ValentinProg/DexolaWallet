import styles from "./SendTransaction.module.scss";
import { useDebounce } from "../../helpers/useDebounce";
import { useEffect, useState } from "react";
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
  const [isSuccessStatus, setIsSuccessStatus] = useState(false);

  const { isConnected } = useAccount();
  const debouncedWalletAddress = useDebounce(walletAddress, 500);
  const { config } = usePrepareSendTransaction({
    to: debouncedWalletAddress,
  });
  const { data, sendTransaction } = useSendTransaction(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsSuccessStatus(true);
      setTimeout(function () {
        setIsSuccessStatus(false);
      }, 3000);
    }
  }, [isSuccess]);

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

      <div className={styles.messageContainer}>
        {validationError && (
          <span className={styles.validationError}>{validationError}</span>
        )}
        {isSuccessStatus && (
          <span className={styles.success}>Successfully sent</span>
        )}
      </div>

      <Button disabled={!isConnected || isLoading}>
        {isLoading ? <ButtonSpinner /> : "Send"}
      </Button>
    </form>
  );
};
