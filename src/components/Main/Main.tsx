import styles from "./Main.module.scss";
import { SendTransaction } from "../SendTransaction/SendTransaction";

const Main = () => {
  return (
    <>
      <div className={styles.main}>
        <SendTransaction />
      </div>
      <a className={styles.gitHubLink} href="https://github.com/ValentinProg/DexolaWallet">gitHub</a>
    </>
  );
};

export default Main;
