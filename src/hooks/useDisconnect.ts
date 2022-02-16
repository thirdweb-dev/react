import { useAccount } from "wagmi";

export function useDisconnect() {
  const [, disconnect] = useAccount();

  return disconnect;
}
