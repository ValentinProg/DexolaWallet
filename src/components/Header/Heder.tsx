import ConnectButton from "../ConnectButton/ConnectButton";

import styles from "./Header.module.scss";
// import { Web3Button } from '@web3modal/react'







const Header = () => {

 

  return (
    <div className={styles.Header}>
         
      <div className={styles.navbarLogo}>Logo</div>
      <ConnectButton/>

      {/* <Web3Button/> */}
    
      {/* <button className={styles.buttonWallet}>Connect wallet</button> */}
    </div>
  );
};

export default Header;
