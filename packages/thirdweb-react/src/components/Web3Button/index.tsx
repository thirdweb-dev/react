import { useActiveChainId } from "../../Provider";
import { useContract, useContractCall } from "../../hooks/async/contracts";
import { useAddress } from "../../hooks/useAddress";
import { useChainId } from "../../hooks/useChainId";
import { useNetwork } from "../../hooks/useNetwork";
import { ConnectWallet } from "../ConnectWallet";
import { Button } from "../shared/Button";
import { ThemeProvider, ThemeProviderProps } from "../shared/ThemeProvider";
import { TransactionError, TransactionResult } from "@thirdweb-dev/sdk";
import { PropsWithChildren, useCallback, useMemo } from "react";

interface Web3ButtonProps extends ThemeProviderProps {
  contractAddress: `0x${string}` | `${string}.eth`;
  functionName: string;
  params?: unknown[] | (() => Promise<unknown[]>);

  // called with the result
  onSuccess?: (result: TransactionResult) => void;
  // called with any error that might happen
  onError?: (error: TransactionError) => void;
}

export const Web3Button: React.FC<PropsWithChildren<Web3ButtonProps>> = ({
  children,
  contractAddress,
  functionName,
  params,

  onSuccess,
  onError,
  ...themeProps
}) => {
  const address = useAddress();
  const walletChainId = useChainId();
  const sdkChainId = useActiveChainId();
  const [, switchNetwork] = useNetwork();

  const switchToChainId = useMemo(() => {
    if (sdkChainId && walletChainId && sdkChainId !== walletChainId) {
      return sdkChainId;
    }
    return null;
  }, [sdkChainId, walletChainId]);

  const contractQuery = useContract(contractAddress);

  const mutation = useContractCall(contractQuery.contract, functionName);
  const handleClick = useCallback(async () => {
    if (switchToChainId) {
      if (switchNetwork) {
        await switchNetwork(switchToChainId);
      } else {
        console.warn(
          "need to switch chain but connected wallet does not support switching",
        );
        return;
      }
    }
    const vars = typeof params === "function" ? await params() : params;
    try {
      const result = await mutation.mutateAsync(vars);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error("Error calling contract", error);
      if (onError) {
        onError(error as TransactionError);
      }
    }
  }, [mutation, onSuccess, onError, switchToChainId, switchNetwork]);

  if (!address) {
    return <ConnectWallet {...themeProps} />;
  }

  return (
    <ThemeProvider {...themeProps}>
      <Button
        style={{ height: "50px" }}
        isLoading={mutation.isLoading || !contractQuery.contract}
        onClick={handleClick}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};
