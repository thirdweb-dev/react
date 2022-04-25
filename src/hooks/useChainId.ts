import { useNetwork } from "wagmi";

/**
 * Hook for accessing the chain ID of the network the current wallet is connected to
 *
 * ```javascript
 * import { useChainId } from "@thirdweb-dev/react"
 * ```
 *
 *
 * ## Usage
 * ```javascript
 * import { useChainId } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const chainId = useChainId()
 *
 *   return <div>{chainId}</div>
 * }
 * ```
 *
 * ## Types
 * @public
 */
export function useChainId(): number | undefined {
  return useNetwork()["0"].data.chain?.id;
}
