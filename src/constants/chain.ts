import type { Chain as WagmiChain } from "wagmi";

export type Chain = WagmiChain;

const chain = {
  mainnet: {
    id: 1,
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
    id: 4,
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
    id: 5,
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
    id: 137,
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
    id: 80001,
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
    id: 43114,
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
  // avalancheFuji: {
  //   id: 43113,
  //   name: "Avalanche FUJI",
  //   nativeCurrency: {
  //     name: "AVAX",
  //     symbol: "AVAX",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  //   blockExplorers: [
  //     {
  //       name: "SnowTrace",
  //       url: "https://testnet.snowtrace.io/",
  //     },
  //   ],
  //   testnet: true,
  // },
  // custom added (non wagmi standard)
  fantom: {
    id: 250,
    name: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorerUrls: [
      {
        name: "FTMScan",
        url: "https://ftmscan.com/",
      },
    ],
    testnet: false,
  },
} as const;
export const defaultSupportedChains = Object.values(chain);

export const ChainConstants = chain;

export type SupportedChainId = typeof defaultSupportedChains[number]["id"];

export type SupportedChain = SupportedChainId | Chain;
