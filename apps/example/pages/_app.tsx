import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
