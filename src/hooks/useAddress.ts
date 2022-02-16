import { useAccount } from "wagmi";

export function useAddress(): string | undefined {
  const [account] = useAccount();
  return account.data?.address;
}
