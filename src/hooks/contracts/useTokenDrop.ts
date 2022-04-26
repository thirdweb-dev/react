import { useContract } from "./useContract";
import { TokenDrop } from "@thirdweb-dev/sdk";

/**
 * Returns a Token contract instance
 * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
 * @internal
 */
export function useTokenDrop(contractAddress?: string): TokenDrop | undefined {
  return useContract("token-drop", contractAddress);
}
