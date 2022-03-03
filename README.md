# Thirdweb react SDK

## Installation

### via NPM

```sh
npm install @thirdweb-dev/react@nightly @thirdweb-dev/sdk@nightly ethers
```

### via Yarn

```sh
yarn add @thirdweb-dev/react@nightly @thirdweb-dev/sdk@nightly ethers
```

## Quick Start

1. Wrap your application in the Provider

```jsx title="App.jsx"
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <YourApp />
    </ThirdwebProvider>
  );
};
```

2. Add a way for your users to connect your wallet somewhere in your app

```jsx title="ConnectMetamaskButton.jsx"
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

export const ConnectMetamaskButtonComponent = () => {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();
  return (
    <div>
      {address ? (
        <button onClick={disconnect}>{address}</button>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}
    </div>
  );
};
```

3. Interact with a thirdweb contract

```jsx title="NFTList.jsx"
import { useNFTCollection } from "@thirdweb-dev/react";

const NFTListComponent = () => {
  const nftCollection = useNFTCollection("{{your nft contract address}}");

  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (nftCollection) {
      nftCollection
        .getAll()
        .then((nfts) => {
          setNfts(nfts);
        })
        .catch((error) => {
          console.error("failed to fetch nfts", error);
        });
    }
  }, [nftCollection]);

  return (
    <ul>
      {nfts.map((nft) => (
        <li key={nft.id}>{nft.name}</li>
      ))}
    </ul>
  );
};
```

## Kitchen Sink Configuration

This is an example of an as-full-as-possible configuration of the `<ThirdwebProvider />`.
Please keep in mind that you will likely not have to configure _anywhere near_ as much for most scenarios.

```jsx title="App.jsx"
import { ThirdwebProvider, ChainId, IpfsStorage } from "@thirdweb-dev/react";

const KitchenSinkExample = () => {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Mainnet}
      chainRpc={{ [ChainId.Mainnet]: "https://mainnet.infura.io/v3" }}
      dAppMeta={{
        name: "Example App",
        description: "This is an example app",
        isDarkMode: false,
        logoUrl: "https://example.com/logo.png",
        url: "https://example.com",
      }}
      storageInterface={new IpfsStorage("https://your.ipfs.host.com")}
      supportedChains={[ChainId.Mainnet]}
      walletConnectors={[
        "walletConnect",
        { name: "injected", options: { shimDisconnect: false } },
        {
          name: "walletLink",
          options: {
            appName: "Example App",
          },
        },
      ]}
      sdkOptions={{
        gasSettings: { maxPriceInGwei: 500, speed: "fast" },
        readonlySettings: {
          chainId: ChainId.Mainnet,
          rpcUrl: "https://mainnet.infura.io/v3",
        },
        gasless: {
          openzeppelin: {
            relayerUrl: "your-relayer-url",
          },
        },
      }}
    >
      <YourApp />
    </ThirdwebProvider>
  );
};
```
