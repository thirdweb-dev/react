import { useContract } from "../hooks/async/contracts";
import React, { useCallback } from "react";

export interface Web3ButtonType {
  contractAddress: string;
  funcName: string;
  params: any[];
  props?: any;
  buttonText?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

/**
 * @param Web3ButtonType - contractAddress, funcName, params
 * @returns button that calls smart contract function
 *
 * @example
 * Usage with a contract:
 * ```jsx
 * <Web3Button contractAddress="0x..." funcName="foo" params={[1, 2, 3]} />
 * ```
 */
export const Web3Button: React.FC<Web3ButtonType> = ({
  contractAddress,
  funcName,
  params,
  props,
  onSuccess,
  onError,
  buttonText = "Click",
}) => {
  const { contract } = useContract(contractAddress);

  const buttonClick = useCallback(async () => {
    console.log("buttonClick", { contract });
    if (contract) {
      try {
        const result = await contract.call(funcName, ...params);
        if (onSuccess) {
          onSuccess(result);
        }
      } catch (err) {
        if (onError) {
          onError(err);
        }
      }
    } else {
      if (onError) {
        onError(new Error("No contract found"));
      }
    }
  }, [contract]);

  return (
    <button onClick={buttonClick} {...props}>
      {buttonText}
    </button>
  );
};
