import { ConnectWallet, experimental_useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { contract, useQuery, useMutation } = experimental_useContract(
    "0x6fD2d8c478180FC70FcC8266AeD2B2d9bCC2728b",
  );
  const nftQuery = useQuery(contract?.nft?.query?.all);

  console.log("*** nfts", nftQuery.data);

  const { mutate } = useMutation(contract?.nft?.mint?.to);

  return (
    <div
      style={{
        width: "100vw",
        background: "#ccc",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <ConnectWallet />

        <button
          onClick={() => {
            mutate([
              "0x6fD2d8c478180FC70FcC8266AeD2B2d9bCC2728b",
              {
                name: "My NFT",
              },
            ]);
          }}
        >
          mint new nft
        </button>
      </div>
    </div>
  );
};

export default Home;
