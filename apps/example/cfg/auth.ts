import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { ethers } from "ethers";

const privateKey = ethers.Wallet.createRandom().privateKey;

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: "example.com",
  privateKey,
});
