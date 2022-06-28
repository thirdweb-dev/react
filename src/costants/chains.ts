import {
  ChainId,
  NATIVE_TOKENS,
  defaultRPCMap,
} from "@thirdweb-dev/sdk/dist/browser";
import { Chain, chain } from "@wagmi/core";

export const defaultChains: Chain[] = [
  // eth
  {
    ...chain.mainnet,
    id: ChainId.Mainnet,
    rpcUrls: {
      ...chain.mainnet.rpcUrls,
      default: defaultRPCMap[ChainId.Mainnet],
    },
  },
  {
    ...chain.rinkeby,
    id: ChainId.Rinkeby,
    rpcUrls: {
      ...chain.rinkeby.rpcUrls,
      default: defaultRPCMap[ChainId.Rinkeby],
    },
  },
  {
    ...chain.goerli,
    id: ChainId.Goerli,
    rpcUrls: {
      ...chain.goerli.rpcUrls,
      default: defaultRPCMap[ChainId.Goerli],
    },
  },
  // polygon
  {
    ...chain.polygon,
    id: ChainId.Polygon,
    rpcUrls: {
      ...chain.polygon.rpcUrls,
      default: defaultRPCMap[ChainId.Polygon],
    },
  },
  {
    ...chain.polygonMumbai,
    id: ChainId.Mumbai,
    rpcUrls: {
      ...chain.polygonMumbai.rpcUrls,
      default: defaultRPCMap[ChainId.Mumbai],
    },
  },
  // optimism
  {
    ...chain.optimism,
    id: ChainId.Optimism,
    rpcUrls: {
      ...chain.optimism.rpcUrls,
      default: defaultRPCMap[ChainId.Optimism],
    },
  },
  {
    ...chain.optimismKovan,
    id: ChainId.OptimismTestnet,
    rpcUrls: {
      ...chain.optimismKovan.rpcUrls,
      default: defaultRPCMap[ChainId.OptimismTestnet],
    },
  },
  // arbitrum
  {
    ...chain.arbitrum,
    id: ChainId.Arbitrum,
    rpcUrls: {
      ...chain.arbitrum.rpcUrls,
      default: defaultRPCMap[ChainId.Arbitrum],
    },
  },
  {
    ...chain.arbitrumRinkeby,
    id: ChainId.ArbitrumTestnet,
    rpcUrls: {
      ...chain.arbitrumRinkeby.rpcUrls,
      default: defaultRPCMap[ChainId.ArbitrumTestnet],
    },
  },
  // fantom
  {
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
  {
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
  {
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
  {
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
];
