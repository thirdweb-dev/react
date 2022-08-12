import { useMetamask } from "../../hooks/connectors/useMetamask";
import { useAddress } from "../../hooks/useAddress";
import { useChainId } from "../../hooks/useChainId";
import { useConnect } from "../../hooks/useConnect";
import { useDisconnect } from "../../hooks/useDisconnect";
import { useNetwork } from "../../hooks/useNetwork";
import { shortenIfAddress } from "../../utils/addresses";
import { useIsMounted } from "../hooks/useIsMounted";
import { Button } from "../shared/Button";
import { ThemeProvider, ThemeProviderProps } from "../shared/ThemeProvider";
import { CoinbaseWallet } from "./connector-logos/CoinbaseWallet";
import { MetaMask } from "./connector-logos/MetaMask";
import { WalletConnect } from "./connector-logos/WalletConnect";
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/react";
import { useId, useMemo } from "react";
import { Connector } from "wagmi";

const SUPPORTED_CONNECTORS = [
  "injected",
  "walletConnect",
  "coinbasewallet",
] as const;

const Icons = {
  metamask: <MetaMask />,
  walletConnect: <WalletConnect />,
  coinbaseWallet: <CoinbaseWallet />,
};

function getIconForConnector(connector: Connector) {
  if (connector.name.toLowerCase().includes("coinbase")) {
    return Icons.coinbaseWallet;
  }
  if (connector.name.toLocaleLowerCase().includes("metamask")) {
    return Icons.metamask;
  }
  const id = connector.id as typeof SUPPORTED_CONNECTORS[number];
  switch (id) {
    case "injected":
      return Icons.metamask;
    case "walletConnect":
      return Icons.walletConnect;
    case "coinbasewallet":
      return Icons.coinbaseWallet;
    default:
      throw new Error("unsupported connector");
  }
}

interface ConnectWalletProps extends ThemeProviderProps {}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  ...themeProps
}) => {
  const id = useId();
  const isMounted = useIsMounted();
  const [state, send] = useMachine(menu.machine({ id }));

  const api = menu.connect(state, send, normalizeProps);

  const address = useAddress();
  const [
    {
      data: { connectors, connector },
    },
    connect,
  ] = useConnect();
  const disconnect = useDisconnect({ reconnectAfterGnosis: false });

  const supportedConnectors = connectors.filter((c) =>
    SUPPORTED_CONNECTORS.includes(c.id as typeof SUPPORTED_CONNECTORS[number]),
  );

  const [network, switchNetwork] = useNetwork();
  const chainId = useChainId();

  const connectWithMetamask = useMetamask();

  const mountedAddress = useMemo(() => {
    return isMounted ? address : null;
  }, [address, isMounted]);

  return (
    <ThemeProvider {...themeProps}>
      <div>
        <Button {...api.triggerProps}>
          {mountedAddress ? shortenIfAddress(mountedAddress) : "Connect Wallet"}
        </Button>
        <div {...api.positionerProps}>
          <ul {...api.contentProps}>
            {mountedAddress ? (
              <>
                <li {...api.getItemProps({ id: "copy", closeOnSelect: true })}>
                  Copy address
                </li>
                <li
                  {...api.getItemProps({
                    id: "disconnect",
                    closeOnSelect: true,
                  })}
                  onClick={disconnect}
                >
                  Disconnect
                </li>
              </>
            ) : (
              <>
                <li
                  {...api.getItemProps({ id: "metamask", closeOnSelect: true })}
                  onClick={() => {
                    connectWithMetamask();
                  }}
                >
                  {Icons.metamask}
                  MetaMask
                </li>
                {supportedConnectors
                  .filter((c) => c.name !== "MetaMask")
                  .map((c) => (
                    <li
                      key={c.id}
                      {...api.getItemProps({ id: c.id, closeOnSelect: true })}
                      onClick={() => {
                        connect(c);
                      }}
                    >
                      {getIconForConnector(c)}
                      {c.name}
                    </li>
                  ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </ThemeProvider>
  );
};
