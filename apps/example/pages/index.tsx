import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useMetamask,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
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
      <div style={{ display: "flex", gap: 20 }}>
        <ConnectWallet colorMode="dark" />
        <ConnectWallet colorMode="light" />
      </div>
    </div>
  );
};

export default Home;
