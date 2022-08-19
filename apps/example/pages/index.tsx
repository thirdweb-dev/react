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
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <h3 style={{ fontFamily: "monospace" }}>Dark Mode</h3>
          <ConnectWallet colorMode="dark" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <h3 style={{ fontFamily: "monospace" }}>Light Mode</h3>
          <ConnectWallet colorMode="light" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <h3 style={{ fontFamily: "monospace" }}>Dark Mode Accent</h3>
          <ConnectWallet colorMode="dark" accentColor="#A855F7" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <h3 style={{ fontFamily: "monospace" }}>Light Mode Accent</h3>
          <ConnectWallet colorMode="light" accentColor="#A855F7" />
        </div>
      </div>
    </div>
  );
};

export default Home;
