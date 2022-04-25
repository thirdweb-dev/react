import { useContract } from "./useContract";
import { Marketplace } from "@thirdweb-dev/sdk";

/**
 * Hook for getting an instance of a `Marketplace` contract. This contract is used to support marketplace for purchase and sale of on-chain assets.
 * @param contractAddress - the address of the Marketplace contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useMarketplace } from '@thirdweb/react-hooks'
 *
 * const App = () => {
 *   const marketplace = useMarketplace("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the marketplace contract in the rest of the component
 *
 *   ...
 * }
 * ```
 * @public
 */
export function useMarketplace(
  contractAddress?: string,
): Marketplace | undefined {
  return useContract("marketplace", contractAddress);
}
