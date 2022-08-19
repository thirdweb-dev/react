import { useMetamask } from "../../hooks/connectors/useMetamask";
import { useAddress } from "../../hooks/useAddress";
import { useChainId } from "../../hooks/useChainId";
import { useConnect } from "../../hooks/useConnect";
import { useDisconnect } from "../../hooks/useDisconnect";
import { useNetwork } from "../../hooks/useNetwork";
import { shortenIfAddress } from "../../utils/addresses";
import { useIsMounted } from "../hooks/useIsMounted";
import { Box } from "../shared/Box";
import { Button } from "../shared/Button";
import { Icon } from "../shared/Icon";
import { Menu, MenuItem } from "../shared/Menu";
import { ThemeProvider, ThemeProviderProps } from "../shared/ThemeProvider";
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/react";
import React, { useId, useMemo } from "react";
import { Connector } from "wagmi";

const SUPPORTED_CONNECTORS = [
  "injected",
  "walletConnect",
  "coinbasewallet",
] as const;

function getIconForConnector(connector: Connector) {
  if (connector.name.toLowerCase().includes("coinbase")) {
    return <Icon name="coinbaseWallet" />;
  }
  if (connector.name.toLocaleLowerCase().includes("metamask")) {
    return <Icon name="metamask" />;
  }
  const id = connector.id as typeof SUPPORTED_CONNECTORS[number];
  switch (id) {
    case "injected":
      return <Icon name="metamask" />;
    case "walletConnect":
      return <Icon name="walletConnect" />;
    case "coinbasewallet":
      return <Icon name="coinbaseWallet" />;
    default:
      throw new Error("unsupported connector");
  }
}

interface ConnectWalletProps extends ThemeProviderProps {}

let connecting = false;
export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  ...themeProps
}) => {
  const id = useId();
  const isMounted = useIsMounted();
  const [state, send] = useMachine(
    menu.machine({
      id,
      closeOnSelect: true,
    }),
  );

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
      <div style={{ position: "relative" }}>
        <Button
          {...api.triggerProps}
          variant={mountedAddress ? "outline" : "solid"}
        >
          {mountedAddress ? shortenIfAddress(mountedAddress) : "Connect Wallet"}
        </Button>

        <Box {...api.positionerProps}>
          <Menu {...api.contentProps}>
            {!api.isOpen ? null : mountedAddress ? (
              <>
                <MenuItem
                  {...api.getItemProps({ id: "copy" })}
                  onClick={() => {
                    // TODO implement copying
                    api.close();
                  }}
                >
                  Copy address
                </MenuItem>
                <MenuItem
                  {...api.getItemProps({
                    id: "disconnect",
                  })}
                  onClick={() => {
                    disconnect();
                    api.close();
                  }}
                >
                  Disconnect
                </MenuItem>
              </>
            ) : (
              <>
                {supportedConnectors.findIndex((c) => c.name === "MetaMask") >
                  -1 && (
                  <MenuItem
                    {...api.getItemProps({
                      id: "metamask",
                    })}
                    onClick={async () => {
                      if (!connecting) {
                        connecting = true;
                        await connectWithMetamask();
                        connecting = false;
                        api.close();
                      }
                    }}
                    leftElement={<Icon name="metamask" />}
                  >
                    MetaMask
                  </MenuItem>
                )}
                {supportedConnectors
                  .filter((c) => c.name !== "MetaMask")
                  .map((c) => {
                    return (
                      <MenuItem
                        key={c.id}
                        {...api.getItemProps({
                          id: c.id,
                        })}
                        onClick={async () => {
                          if (!connecting) {
                            connecting = true;
                            await connect(c);
                            connecting = false;
                            api.close();
                          }
                        }}
                        leftElement={getIconForConnector(c)}
                      >
                        {c.name}
                      </MenuItem>
                    );
                  })}
              </>
            )}
          </Menu>
        </Box>
      </div>
    </ThemeProvider>
  );
};
