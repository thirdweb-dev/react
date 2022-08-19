import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
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
      <div style={{ display: "flex", flexDirection: "row", gap: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "monospace" }}>WalletConnect</h2>
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
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "monospace" }}>Web3Button</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <h3 style={{ fontFamily: "monospace" }}>Dark Mode</h3>
            <Web3Button
              colorMode="dark"
              contractAddress="0x6fD2d8c478180FC70FcC8266AeD2B2d9bCC2728b"
              functionName="setApprovalForAll"
              params={["0xE79ee09bD47F4F5381dbbACaCff2040f2FbC5803", true]}
              onSuccess={(result) => console.log(result)}
              onError={(error) => console.error(error)}
            >
              Do The Thing
            </Web3Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <h3 style={{ fontFamily: "monospace" }}>Light Mode</h3>
            <Web3Button
              colorMode="light"
              contractAddress="0x6fD2d8c478180FC70FcC8266AeD2B2d9bCC2728b"
              functionName="name"
              onSuccess={(result) => console.log(result)}
              onError={(error) => console.error(error)}
            >
              Do The Thing
            </Web3Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <h3 style={{ fontFamily: "monospace" }}>Dark Mode Accent</h3>
            <Web3Button
              colorMode="dark"
              accentColor="#A855F7"
              contractAddress="0x6fD2d8c478180FC70FcC8266AeD2B2d9bCC2728b"
              functionName="name"
              onSuccess={(result) => console.log(result)}
              onError={(error) => console.error(error)}
            >
              Do The Thing
            </Web3Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <h3 style={{ fontFamily: "monospace" }}>Light Mode Accent</h3>
            <Web3Button
              colorMode="light"
              accentColor="#A855F7"
              contractAddress="0x6fD2d8c478180FC70FcC8266AeD2B2d9bCC2728b"
              functionName="name"
              onSuccess={(result) => console.log(result)}
              onError={(error) => console.error(error)}
            >
              Do The Thing
            </Web3Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
