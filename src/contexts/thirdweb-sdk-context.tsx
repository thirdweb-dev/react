import { RequiredParam } from "../types";
import {
  ChainId,
  IStorage,
  NetworkOrSignerOrProvider,
  SDKOptions,
  SUPPORTED_CHAIN_ID,
  ThirdwebSDK,
} from "@thirdweb-dev/sdk";
import { Signer } from "ethers";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import invariant from "tiny-invariant";

interface SDKContext {
  sdk?: ThirdwebSDK;
  _inProvider?: true;
  desiredChainId: number;
}

const ThirdwebSDKContext = createContext<SDKContext>({ desiredChainId: -1 });

export interface ThirdwebSDKProviderProps {
  desiredChainId: RequiredParam<ChainId>;
  sdkOptions?: SDKOptions;
  storageInterface?: IStorage;
  signer?: Signer;
  provider: NetworkOrSignerOrProvider;
}

/**
 * A barebones wrapper around the Thirdweb SDK.
 *
 * You can use this in order to be able to pass a provider & signer directly to the SDK.
 *
 * @remarks Utilizing this provider will mean hooks for wallet management are not available, if you need those please use the {@link ThirdwebProvider} instead.
 *
 * @beta
 */
export const ThirdwebSDKProvider: React.FC<
  React.PropsWithChildren<ThirdwebSDKProviderProps>
> = ({
  sdkOptions,
  desiredChainId,
  storageInterface,
  provider,
  signer,
  children,
}) => {
  const sdk = useMemo(() => {
    if (!desiredChainId || typeof window === "undefined") {
      return undefined;
    }

    const _sdk = new ThirdwebSDK(provider, sdkOptions, storageInterface);
    (_sdk as any)._chainId = desiredChainId;
    return _sdk;
  }, [provider, sdkOptions, storageInterface, desiredChainId]);

  useEffect(() => {
    if (signer && sdk && (sdk as any)._chainId === desiredChainId) {
      sdk.updateSignerOrProvider(signer);
    }
  }, [signer, sdk, desiredChainId]);

  const ctxValue = useMemo(
    () => ({
      sdk,
      desiredChainId: desiredChainId || -1,
      _inProvider: true as const,
    }),
    [sdk],
  );

  return (
    <ThirdwebSDKContext.Provider value={ctxValue}>
      {children}
    </ThirdwebSDKContext.Provider>
  );
};

/**
 *
 * @returns {@link ThirdwebSDK}
 * @internal
 */
export function useSDK(): ThirdwebSDK | undefined {
  const ctx = useContext(ThirdwebSDKContext);
  invariant(
    ctx._inProvider,
    "useSDK must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?",
  );
  return ctx.sdk;
}

/**
 *
 * @internal
 */
export function useDesiredChainId(): number {
  const ctx = useContext(ThirdwebSDKContext);
  invariant(
    ctx._inProvider,
    "useDesiredChainId must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?",
  );
  return ctx.desiredChainId;
}

/**
 *
 * @internal
 */
export function useActiveChainId(): SUPPORTED_CHAIN_ID | undefined {
  const ctx = useContext(ThirdwebSDKContext);
  invariant(
    ctx._inProvider,
    "useActiveChainId must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?",
  );
  return (ctx.sdk as any)?._chainId;
}
