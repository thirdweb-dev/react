import { useContract } from "../hooks/async/contracts";
import React, { useCallback } from "react";

export interface Web3ButtonType {
  contractAddress: string;
  funcName: string;
  params: any[];
  props: string;
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
export const Web3Button: React.FC<Web3ButtonType> = (
  { contractAddress, funcName, params },
  props,
) => {
  const { contract } = useContract(contractAddress);

  const buttonClick = useCallback(() => {
    if (contract) {
      contract.call(funcName, ...params).then(console.log);
    }
  }, [contract]);

  return (
    <button onClick={buttonClick} {...props}>
      {props.children}
    </button>
  );
};
