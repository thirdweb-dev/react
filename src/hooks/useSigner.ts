import { useAccount, useNetwork, useSigner as useWagmiSigner } from "wagmi";
import { useQuery } from "react-query";
import { Signer } from "ethers";

export function useSigner() {
  const [, getSigner] = useWagmiSigner();
  const [account] = useAccount();
  const [network] = useNetwork();

  return useQuery(
    [
      "signer",
      { address: account.data?.address, chainId: network.data.chain?.id },
    ],
    async () => {
      const signer = await getSigner();
      return Signer.isSigner(signer) ? signer : undefined;
    },
    {
      enabled: !!account.data?.address && !!network.data.chain?.id,
      staleTime: Infinity,
      retry: false,
    },
  );
}
