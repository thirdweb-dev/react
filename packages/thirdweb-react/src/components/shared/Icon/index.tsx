import { CoinbaseWalletIcon } from "./icons/coinbase-wallet";
import { MetamaskIcon } from "./icons/metamask";
import { WalletConnectIcon } from "./icons/wallet-connect";
import styled from "@emotion/styled";
import React from "react";

interface StyledSvg {}

const StyledSvg = styled.svg<StyledSvg>`
  border-radius: 0.25em;
`;

const iconMap = {
  metamask: MetamaskIcon,
  walletConnect: WalletConnectIcon,
  coinbaseWallet: CoinbaseWalletIcon,
} as const;

export interface IconProps extends StyledSvg {
  name: keyof typeof iconMap;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const icon = iconMap[name];
  return (
    <StyledSvg {...icon.svgProps} {...props}>
      {icon.paths}
    </StyledSvg>
  );
};
