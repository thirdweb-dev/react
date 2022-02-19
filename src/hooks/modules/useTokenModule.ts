import { Token } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useToken(moduleAddress?: string): Token | undefined {
  return useContract("token", moduleAddress);
}
