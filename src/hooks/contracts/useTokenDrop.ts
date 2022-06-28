import { RequiredParam } from "../../types/types";
import { useBuiltinContract } from "./useBuiltinContract";
import type { ChainIdOrName, TokenDrop } from "@thirdweb-dev/sdk/dist/browser";

/**
 * Returns a Token contract instance
 * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
 * @internal
 */
export function useTokenDrop(
  contractAddress: RequiredParam<string>,
  chain?: ChainIdOrName,
): TokenDrop | undefined {
  return useBuiltinContract("token-drop", contractAddress, chain).data;
}
