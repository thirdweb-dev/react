import {
  ChainId,
  NATIVE_TOKENS,
  SUPPORTED_CHAIN_ID,
  defaultRPCMap,
} from "@thirdweb-dev/sdk";
import { Chain, chain } from "@wagmi/core";

export const defaultChains: Record<SUPPORTED_CHAIN_ID, Chain> = {
  // eth
  [ChainId.Mainnet]: chain.mainnet,
  [ChainId.Rinkeby]: chain.rinkeby,
  [ChainId.Goerli]: chain.goerli,
  // polygon
  [ChainId.Polygon]: chain.polygon,
  [ChainId.Mumbai]: chain.polygonMumbai,
  // optimism
  [ChainId.Optimism]: chain.optimism,
  [ChainId.OptimismTestnet]: chain.optimismKovan,
  // arbitrum
  [ChainId.Arbitrum]: chain.arbitrum,
  [ChainId.ArbitrumTestnet]: chain.arbitrumRinkeby,
  // fantom
  [ChainId.Fantom]: {
    id: ChainId.Fantom,
    name: "Fantom",
    network: "fantom",
    rpcUrls: {
      default: defaultRPCMap[ChainId.Fantom],
    },
    nativeCurrency: NATIVE_TOKENS[ChainId.Fantom],
    blockExplorers: {
      default: {
        name: "FTMScan",
        url: "https://ftmscan.com",
      },
    },
  },
  [ChainId.FantomTestnet]: {
    id: ChainId.FantomTestnet,
    name: "Fantom Testnet",
    network: "fantom-testnet",
    rpcUrls: {
      default: defaultRPCMap[ChainId.FantomTestnet],
    },
    nativeCurrency: NATIVE_TOKENS[ChainId.FantomTestnet],
    blockExplorers: {
      default: {
        name: "FTMScan (Testnet)",
        url: "https://testnet.ftmscan.com",
      },
    },
    testnet: true,
  },
  // avalanche
  [ChainId.Avalanche]: {
    id: ChainId.Avalanche,
    name: "Avalanche",
    network: "avax-c-chain",
    rpcUrls: {
      default: defaultRPCMap[ChainId.Avalanche],
    },
    nativeCurrency: NATIVE_TOKENS[ChainId.Avalanche],
    blockExplorers: {
      default: {
        name: "Avax Explorer",
        url: "https://explorer.avax.network",
      },
    },
  },
  [ChainId.AvalancheFujiTestnet]: {
    id: ChainId.AvalancheFujiTestnet,
    name: "Avalanche Fuji Testnet",
    network: "avax-c-chain-testnet",
    rpcUrls: {
      default: defaultRPCMap[ChainId.AvalancheFujiTestnet],
    },
    nativeCurrency: NATIVE_TOKENS[ChainId.AvalancheFujiTestnet],
    blockExplorers: {
      default: {
        name: "Avax Explorer (Testnet)",
        url: "https://explorer.avax-test.network",
      },
    },
  },
};
