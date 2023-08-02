import styles from './SendTransaction.module.scss';
import { useDebounce } from "../../helpers/useDebounce";
import { useState } from "react";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

export const SendTransaction = () => {
  const [to, setTo] = useState("");
  const [toError, setToError] = useState("");

  const toHandlerValidation = (e: any) => {
    setTo(e.target.value);
    const reg = /^(0x)?[0-9a-f]{40}$/;
    if (!reg.test(String(e.target.value).toLowerCase())) {
      setToError("Not a valid address");
    } else {
      setToError("");
    }
  };

  const debouncedTo = useDebounce(to, 500);

  const [amount, setAmount] = useState("");

  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
  });
  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form className={styles.SendTransactionForm}
      onSubmit={(e) => {
        e.preventDefault();
        sendTransaction?.();
      }}
    >
      <div>{toError}</div>
      <input
        aria-label="Recipient"
        onChange={(e) => toHandlerValidation(e)}
        placeholder="Enter your wallet adress"
        value={to}
      />
      <input
        aria-label="Amount (ether)"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
        value={amount}
        type='number'
      />
      <button disabled={isLoading || !sendTransaction || !to || !amount}>
        {isLoading ? <ButtonSpinner /> : "Send"}
        
      </button>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
};
