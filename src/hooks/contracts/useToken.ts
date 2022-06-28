import { RequiredParam } from "../../types/types";
import { useBuiltinContract } from "./useBuiltinContract";
import type { ChainIdOrName, Token } from "@thirdweb-dev/sdk/dist/browser";

/**
 * Hook for getting an instance of an `Token` contract. This contract supports ERC20 compliant tokens.
 * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useToken } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const token = useToken("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the token contract in the rest of the component
 *
 *   // For example, this function will get the connected wallets token balance
 *   async function balance() {
 *     const balance = await token.balance()
 *     return balance
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 */
export function useToken(
  contractAddress: RequiredParam<string>,
  chain?: ChainIdOrName,
): Token | undefined {
  return useBuiltinContract("token", contractAddress, chain).data;
}
