import { useAccount } from "wagmi";

/**
 *
 * @returns a function to call to disconnect the connected wallet
 * @public
 */
export function useDisconnect() {
  const [, disconnect] = useAccount();

  return disconnect;
}
