import { useAccount } from "wagmi";

/**
 *
 * @returns the address of the connected wallet
 * @public
 */
export function useAddress(): string | undefined {
  const [account] = useAccount();
  return account.data?.address;
}
