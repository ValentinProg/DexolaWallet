import styles from "./Main.module.scss";
import { SendTransaction } from "../SendTransaction/SendTransaction";
import Github from "../../assets/github.svg";

const Main = () => {
  return (
    <>
      <div className={styles.main}>
        <SendTransaction />
      </div>
      <a
        className={styles.gitHubLink}
        href="https://github.com/ValentinProg/DexolaWallet"
      >
        <img className={styles.gitHubImg} src={Github} />
      </a>
    </>
  );
};

export default Main;
