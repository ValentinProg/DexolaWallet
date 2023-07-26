import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

import { configureChains, createConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";

const chains = [ mainnet, goerli];
export const projectId = "1f45e52681f07a5c038ba16a2be10a07";

const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

 export const ethereumClient = new EthereumClient(wagmiConfig, chains);
