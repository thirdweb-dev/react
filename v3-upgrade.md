# Upgrade from v2 -> v3

## Dependencies

You will now have to explicitly add `wagmi` as a peer dependency to use wallet-related functionality

```diff
- npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers
+ npm install @thirdweb-dev/react @thirdweb-dev/sdk wagmi ethers
```

```diff
- yarn add @thirdweb-dev/react @thirdweb-dev/sdk ethers
+ yarn add @thirdweb-dev/react @thirdweb-dev/sdk wagmi ethers
```

If you do not require wallet-related functionality or are handling it differently, you can skip installing `wagmi`, and the SDK will work fine: [Learn more](#advanced)

## Provider setup

### Standard

The `<ThirdwebProvider>` now has 0 required props. You can _optionally_ pass a `chainId` prop that defines the default chain your dApp operates on.

If you do _not_ provide the `chainId` prop the SDK will be initialized once a user connects a wallet.

```diff
- import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
+ import { ThirdwebProvider } from "@thirdweb-dev/react";

const App = () => {
  return (
-    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
+    <ThirdwebProvider>
      <YourApp />
    </ThirdwebProvider>
  );
};
```

### Advanced

If you want to bring your own `Signer` or have some other more advanced setup you can now wrap the underlying `<ThirdwebSDKProvider>` directly

```jsx
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";

const App = ({ signer }) => {
  return (
    <ThirdwebSDKProvider signer={signer}>
      <YourApp />
    </ThirdwebSDKProvider>
  );
};
```

#### Example: RainbowKit

One example use-case for the advanced setup is using the thirdweb SDK in combination with rainbowkit

```jsx
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { WagmiConfig, chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit x thirdweb App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const ThirdwebSDKEnhancer = ({ children }) => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  return (
    <ThirdwebSDKProvider
      queryClient={wagmiClient.queryClient}
      chainId={chain?.id}
      signer={signer || undefined}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ThirdwebSDKEnhancer>
          <YourApp />
        </ThirdwebSDKEnhancer>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
```
