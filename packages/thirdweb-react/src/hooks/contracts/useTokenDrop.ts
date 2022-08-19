import { useBuiltinContract } from "./useBuiltinContract";
import { TokenDrop } from "@thirdweb-dev/sdk/dist/browser";

/**
 * Returns a Token contract instance
 * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
 * @internal
 */
export function useTokenDrop(contractAddress?: string): TokenDrop | undefined {
  return useBuiltinContract("token-drop", contractAddress);
}
