import { useActiveChainId } from "../../Provider";
import { useContract, useContractCall } from "../../hooks/async/contracts";
import { useAddress } from "../../hooks/useAddress";
import { useChainId } from "../../hooks/useChainId";
import { useNetwork } from "../../hooks/useNetwork";
import { ConnectWallet } from "../ConnectWallet";
import { Button } from "../shared/Button";
import { ThemeProvider, ThemeProviderProps } from "../shared/ThemeProvider";
import { TransactionError, TransactionResult } from "@thirdweb-dev/sdk";
import type { CallOverrides } from "ethers";
import { PropsWithChildren, useMemo } from "react";

interface Web3ButtonProps extends ThemeProviderProps {
  contractAddress: `0x${string}` | `${string}.eth`;
  functionName: string;
  params?: unknown[] | (() => Promise<unknown[]>);
  overrides?: CallOverrides;
  // called with the result
  onSuccess?: (result: TransactionResult) => void;
  // called with any error that might happen
  onError?: (error: TransactionError) => void;
  // called when the function is called
  onSubmit?: () => void;
  // disabled state
  isDisabled?: boolean;
}

export const Web3Button: React.FC<PropsWithChildren<Web3ButtonProps>> = ({
  contractAddress,
  functionName,
  params,
  overrides,
  onSuccess,
  onError,
  onSubmit,
  isDisabled,
  children,
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

  const handleClick = async () => {
    if (switchToChainId) {
      if (switchNetwork) {
        await switchNetwork(switchToChainId);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        console.warn(
          "need to switch chain but connected wallet does not support switching",
        );
        return;
      }
    }
    const vars = typeof params === "function" ? await params() : params;
    const withOverrides =
      vars && overrides ? [...vars, overrides] : overrides ? [overrides] : vars;
    try {
      const result = await mutation.mutateAsync(withOverrides);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error("Error calling contract", error);
      if (onError) {
        onError(error as TransactionError);
      }
    }
  };

  if (!address) {
    return <ConnectWallet {...themeProps} />;
  }

  return (
    <ThemeProvider {...themeProps}>
      <Button
        style={{ height: "50px" }}
        isLoading={mutation.isLoading || !contractQuery.contract}
        onClick={handleClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};
