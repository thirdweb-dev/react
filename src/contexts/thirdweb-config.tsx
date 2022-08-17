import {
  Chain,
  SupportedChainId,
  defaultSupportedChains,
} from "../constants/chain";
import { ChainId } from "@thirdweb-dev/sdk/dist/browser";
import React, { PropsWithChildren, createContext, useContext } from "react";

export interface ThirdwebAuthConfig {
  /**
   * The backend URL of the authentication endoints. For example, if your endpoints are
   * at /api/auth/login, /api/auth/logout, etc. then this should be set to "/api/auth".
   */
  authUrl: string;

  /**
   * The frontend domain used to generate the login payload.
   * This domain should match the domain used on your auth backend.
   */
  domain: string;

  /**
   * The URL to redirect to after a succesful login.
   */
  loginRedirect?: string;
}

interface ThirdwebConfigContext {
  rpcUrlMap: Record<SupportedChainId | number, string>;
  supportedChains: Chain[];
  authConfig?: ThirdwebAuthConfig;
}

export const defaultChainRpc: Record<SupportedChainId | number, string> = {
  [ChainId.Mainnet]: "mainnet",
  [ChainId.Rinkeby]: "rinkeby",
  [ChainId.Goerli]: "goerli",
  [ChainId.Polygon]: "polygon",
  [ChainId.Mumbai]: "mumbai",
  [ChainId.Fantom]: "fantom",
  [ChainId.Avalanche]: "avalanche",
};

export const ThirdwebConfigContext = createContext<ThirdwebConfigContext>({
  rpcUrlMap: defaultChainRpc,
  supportedChains: defaultSupportedChains,
});

export const ThirdwebConfigProvider: React.FC<
  PropsWithChildren<{
    value: ThirdwebConfigContext;
  }>
> = ({ value, children }) => (
  <ThirdwebConfigContext.Provider value={value}>
    {children}
  </ThirdwebConfigContext.Provider>
);

export function useThirdwebConfigContext() {
  return useContext(ThirdwebConfigContext);
}
