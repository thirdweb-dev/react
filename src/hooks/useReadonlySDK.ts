import { IStorage, SDKOptions, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useMemo } from "react";

export function useReadonlySDK(
  readonlyRpcUrl: string,
  sdkOptions: SDKOptions,
  storageInterface?: IStorage,
): ThirdwebSDK {
  return useMemo(() => {
    return new ThirdwebSDK(
      readonlyRpcUrl,
      {
        ...sdkOptions,
        readonlySettings: {
          ...sdkOptions?.readonlySettings,
          rpcUrl: readonlyRpcUrl,
        },
      },
      storageInterface,
    );
  }, [readonlyRpcUrl, sdkOptions]);
}
