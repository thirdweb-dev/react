import {
  ConnectWallet,
  useAddress,
  experimental_useContract as useContract,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { useRead } = useContract("0x6fD2d8c478180FC70FcC8266AeD2B2d9bCC2728b");

  const address = useAddress();

  const { data, isLoading, error } = useRead((contract) =>
    contract?.nft?.balanceOf(address || ""),
  );

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
      </div>
      <button
        onClick={() => {
          // mutate()
        }}
      ></button>
    </div>
  );
};

export default Home;
