import { Edition } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useEdition(moduleAddress?: string): Edition | undefined {
  return useContract("edition", moduleAddress);
}
