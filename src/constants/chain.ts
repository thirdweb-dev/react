import { ChainId } from "@thirdweb-dev/sdk/dist/browser";
import type { Chain as WagmiChain } from "wagmi";

export type Chain = WagmiChain;

const chain: Record<string, Chain> = {
  mainnet: {
    id: ChainId.Mainnet,
    name: "Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorers: [
      {
        name: "Etherscan",
        url: "https://etherscan.io",
      },
    ],
  },
  rinkeby: {
    id: ChainId.Rinkeby,
    name: "Rinkeby",
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "rETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorers: [
      {
        name: "Etherscan",
        url: "https://rinkeby.etherscan.io",
      },
    ],
    testnet: true,
  },
  goerli: {
    id: ChainId.Goerli,
    name: "Goerli",
    nativeCurrency: {
      name: "Goerli Ether",
      symbol: "gETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorers: [
      {
        name: "Etherscan",
        url: "https://goerli.etherscan.io",
      },
    ],
    testnet: true,
  },
  polygonMainnet: {
    id: ChainId.Polygon,
    name: "Polygon Mainnet",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://polygon-rpc.com",
      "https://rpc-mainnet.matic.network",
      "https://matic-mainnet.chainstacklabs.com",
      "https://rpc-mainnet.maticvigil.com",
      "https://rpc-mainnet.matic.quiknode.pro",
      "https://matic-mainnet-full-rpc.bwarelabs.com",
    ],
    blockExplorers: [
      {
        name: "Polygonscan",
        url: "https://polygonscan.com",
      },
    ],
  },
  polygonTestnetMumbai: {
    id: ChainId.Mumbai,
    name: "Polygon Testnet Mumbai",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://matic-mumbai.chainstacklabs.com",
      "https://rpc-mumbai.maticvigil.com",
      "https://matic-testnet-archive-rpc.bwarelabs.com",
    ],
    blockExplorers: [
      {
        name: "Polygonscan",
        url: "https://mumbai.polygonscan.com",
      },
    ],
    testnet: true,
  },
  avalanche: {
    id: ChainId.Avalanche,
    name: "Avalanche",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: [
      "https://api.avax.network/ext/bc/C/rpc",
      "https://rpc.ankr.com/avalanche",
    ],
    blockExplorers: [
      {
        name: "SnowTrace",
        url: "https://snowtrace.io/",
      },
    ],
    testnet: false,
  },
  fantom: {
    id: ChainId.Fantom,
    name: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorers: [
      {
        name: "FTMScan",
        url: "https://ftmscan.com/",
      },
    ],
    testnet: false,
  },
};

export const defaultSupportedChains = Object.values(chain) as Chain[];

export type SupportedChainId = typeof defaultSupportedChains[number]["id"];

export type SupportedChain = SupportedChainId | Chain;
