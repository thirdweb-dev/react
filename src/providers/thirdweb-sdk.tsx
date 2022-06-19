import { RequiredParam } from "../types/types";
import {
  ChainOrRpc,
  IStorage,
  SDKOptions,
  SUPPORTED_CHAIN_ID,
  ThirdwebSDK,
  defaultRPCMap,
} from "@thirdweb-dev/sdk";
import { Signer } from "ethers";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const ThirdwebSDKContext = createContext<ThirdwebSDK | undefined>(undefined);

interface AppMetadata {
  name: string;
  logoUrl?: string;
  description?: string;
}

type ChainIDToRpcUrlMap = Record<SUPPORTED_CHAIN_ID | number, string>;

interface ThirdwebConfigContext {
  chainIdToRPCUrlMap: ChainIDToRpcUrlMap;
  appMetadata: AppMetadata;
}

const DEFAULT_APP_METADATA: AppMetadata = {
  name: "thirdweb - app",
};

const ThirdwebConfigContext = createContext<ThirdwebConfigContext>({
  chainIdToRPCUrlMap: defaultRPCMap,
  appMetadata: DEFAULT_APP_METADATA,
});

export interface ThirdwebSDKProviderProps {
  readonly chainId: RequiredParam<ChainOrRpc>;
  readonly chainIdToRPCUrlMap?: Partial<ChainIDToRpcUrlMap>;
  readonly options?: SDKOptions;
  readonly storageInterface?: IStorage;
  readonly signer?: Signer;
  readonly appMetadata?: AppMetadata;
  queryClient?: QueryClient;
}

export const ThirdwebSDKProvider: React.FC<
  React.PropsWithChildren<ThirdwebSDKProviderProps>
> = ({
  children,
  chainId,
  chainIdToRPCUrlMap,
  options,
  storageInterface,
  signer,
  appMetadata,
  queryClient,
}) => {
  const queryClientInstance = useMemo(() => {
    if (queryClient) {
      return queryClient;
    }
    return new QueryClient();
  }, [queryClient]);

  const mergedAppMetadata = useMemo(() => {
    return { ...DEFAULT_APP_METADATA, ...appMetadata };
  }, [appMetadata]);

  // merge together the default RPC map and the user-provided one
  const mergedRPCMap = useMemo(() => {
    return { ...defaultRPCMap, ...chainIdToRPCUrlMap };
  }, [chainIdToRPCUrlMap]);

  // merge the options with the rpc map
  const mergedOptions = useMemo(() => {
    return {
      ...options,
      rpcMap: { ...options?.chainIdToRPCUrlMap, ...mergedRPCMap },
    };
  }, [mergedRPCMap, options]);

  // setup the SDK instance
  const sdk = useMemo(() => {
    if (chainId) {
      // if we already have a signer we'll pass it in from the getgo, but it is not required here
      return new ThirdwebSDK(chainId, signer, mergedOptions, storageInterface);
    }
    return undefined;
    // we're ignoring the signer on purpose here, signer gets connected and disconnected below
    // we do not want to re-init the SDK if it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, mergedOptions, storageInterface]);

  useEffect(() => {
    // if there is no SDK instance we can't do anything yet
    if (sdk) {
      if (signer) {
        // if we have a signer, connect
        sdk.wallet.connect(signer);
      } else {
        // otherwise disconnect any previously set signer
        sdk.wallet.disconnect();
      }
    }
  }, [signer, sdk]);

  return (
    <ThirdwebConfigContext.Provider
      value={{
        chainIdToRPCUrlMap: mergedRPCMap,
        appMetadata: mergedAppMetadata,
      }}
    >
      <QueryClientProvider client={queryClientInstance}>
        <ThirdwebSDKContext.Provider value={sdk}>
          {children}
        </ThirdwebSDKContext.Provider>
      </QueryClientProvider>
    </ThirdwebConfigContext.Provider>
  );
};

export function useThirdwebConfig() {
  return useContext(ThirdwebConfigContext);
}

/**
 * Use this to access the ThirdwebSDK instance directly.
 *
 * @returns an instance of the ThirdwebSDK or undefined if no chain is defined
 * @public
 */
export function useSDK() {
  return useContext(ThirdwebSDKContext);
}
