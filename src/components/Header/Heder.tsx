import ConnectButton from "../ConnectButton/ConnectButton";

import styles from "./Header.module.scss";
import { Web3Button } from "@web3modal/react";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>Logo</div>
      <ConnectButton />
      {/* <Web3Button/> */}
    </div>
  );
};

export default Header;
