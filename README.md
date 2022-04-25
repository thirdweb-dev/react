# Thirdweb React SDK

The Thirdweb React SDK provides a collection of hooks with everything you need to start building your own web3 apps with [React](https://reactjs.org/).

## Installation

You can install this SDK with either `npm` or `yarn`:

```sh
npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers
```

```sh
yarn add @thirdweb-dev/react @thirdweb-dev/sdk ethers
```


## Starter Templates

We provide template repositories to help you get started with thirdweb quickly. You can find all the available starter respositories below.

- Next.js ([typescript](https://github.com/thirdweb-example/next-typescript-starter) / [javascript](https://github.com/thirdweb-example/next-javascript-starter))
- Create React App ([typescript](https://github.com/thirdweb-example/cra-typescript-starter) / [javascript](https://github.com/thirdweb-example/cra-javascript-starter))
- Vite ([typescript](https://github.com/thirdweb-example/vite-typescript-starter) / [javascript](https://github.com/thirdweb-example/vite-javascript-starter))

_[All available templates.](https://github.com/thirdweb-example)_

## Quick Start

**Configure the Thirdweb Provider**

In order to use the hooks offered by the React SDK, you need to first setup a `ThirdwebProvider` for your app which lets you optionally configure your app. You can use this configuration to control what networks you want users to connect to, what types of wallets can connect to your app, and the settings for the [Typescript SDK](https://docs.thirdweb.com/typescript).

At the top level of your application, add a `ThirdwebProvider` as follows:

```jsx title="App.jsx"
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <YourApp />
    </ThirdwebProvider>
  );
};
```

Now you'll be able to use all the hooks provided by the React SDK! Let's take a look.

**Let Users Connect Wallets**

Next, we'll add a button to our app which will let users conect their wallets. For now, we'll make it so that users with metamask wallets can connect.

```jsx title="ConnectMetamaskButton.jsx"
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

export const ConnectMetamaskButtonComponent = () => {
  const connectWithMetamask = useMetamask();

  const address = useAddress();
  return (
    <div>
      {address ? (
        <h4>Connected as {address}</h4>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}
    </div>
  );
};
```

Here, we use the `useMetamask` hook to handle metamask connection. When a user clicks the button, we'll call the `connectWithMetamask` function, which will prompt users to connect their metamask wallet.

**Interact With Contracts**

The Thirdweb React SDK also enables you to interact directly with contracts through simple hooks!

Let's setup a simple component to interact with an NFT Collection contract and get the data of all the NFTs on the contract.

```jsx title="NFTList.jsx"
import { useNFTCollection } from "@thirdweb-dev/react";

const NFTListComponent = () => {
  const nftCollection = useNFTCollection("<NFT-COLLECTION-CONTRACT-ADDRESS>");

  const [nfts, setNfts] = useState<NFTMetadataOwner[]>([]);

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
        <li key={nft.metadata.id.toString()}>{nft.metadata.name}</li>
      ))}
    </ul>
  );
};
```

Here, we get an `NFTCollection` contract instance from the [Typescript SDK](https://docs.thirdweb.com/typescript). We can then use all the methods on this thirdweb contract SDK instance - so we use the `getAll` method to get all the NFTs from the contract, and we display them on the page.

And that's all for the setup! Just like that, you can setup a `ThirdwebProvider` and use all the hooks of the SDK, allowing you to let users connect wallets, interact with contracts, and more!

## Advanced Configuration

The `ThirdwebProvider` offers a number of configuration options to control the behavior of the React and Typescript SDK.

These all the configuration options of the `<ThirdwebProvider />`.
We provide defaults for all of these, but you customize them to suit your needs.

```jsx title="App.jsx"
import { ChainId, IpfsStorage, ThirdwebProvider } from "@thirdweb-dev/react";

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
        {
          name: "magic",
          options: {
            apiKey: "your-magic-api-key",
            rpcUrls: {
              [ChainId.Mainnet]: "https://mainnet.infura.io/v3"
            },
          },
        }
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
