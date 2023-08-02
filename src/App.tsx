import styles from "./App.module.scss";
import Header from "./components/Header/Heder";
import Main from "./components/Main/Main";
import { Web3Modal } from "@web3modal/react";
import { projectId, wagmiConfig, ethereumClient } from "./blockchain/config";
import { WagmiConfig } from "wagmi";

const App = () => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div className={styles.app}>
          {/* <div className={styles.app}> */}
            <Header />
            <Main />
          {/* </div> */}
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default App;
