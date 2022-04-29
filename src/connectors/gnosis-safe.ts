import Safe from "@gnosis.pm/safe-core-sdk";
import { SafeEthersSigner, SafeService } from "@gnosis.pm/safe-ethers-adapters";
import EthersAdapter from "@gnosis.pm/safe-ethers-lib";
import { ChainId } from "@thirdweb-dev/sdk";
import { Signer, ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import invariant from "tiny-invariant";
import { Chain, Connector, ConnectorData, normalizeChainId } from "wagmi";

// TODO handle all the browserfy
// if (!globalThis.fs) {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   globalThis.fs = require("browserify-fs");
// }

const CHAIN_ID_TO_GNOSIS_SERVER_URL = {
  [ChainId.Mainnet]: "https://safe-transaction.mainnet.gnosis.io/",
  [ChainId.Avalanche]: "https://safe-transaction.avalanche.gnosis.io/",
  [ChainId.Polygon]: "https://safe-transaction.polygon.gnosis.io/",
  [ChainId.Goerli]: "https://safe-transaction.goerli.gnosis.io/",
  [ChainId.Rinkeby]: "https://safe-transaction.rinkeby.gnosis.io/",
};

export interface GnosisConnectorArguments {
  safeAddress: string;
  safeChainId: number;
}

export class GnosisSafeConnector extends Connector {
  id: string = "gnosis";
  ready: boolean = true;
  name: string = "Gnosis Safe";
  // config
  personalSigner?: Signer;
  private config?: GnosisConnectorArguments;
  private safeSigner?: Signer;

  constructor(config: { chains?: Chain[] }) {
    super({ ...config, options: undefined });
  }

  async connect(): Promise<ConnectorData<any>> {
    this.safeSigner = await this.createSafeSigner();
    const account = await this.getAccount();
    const provider = await this.getProvider();
    const id = await this.getChainId();
    return {
      account,
      provider,
      chain: { id, unsupported: this.isChainUnsupported(id) },
    };
  }

  private async createSafeSigner() {
    const signer = this.personalSigner;
    const safeAddress = this.config?.safeAddress;
    const safeChainId = this.config
      ?.safeChainId as keyof typeof CHAIN_ID_TO_GNOSIS_SERVER_URL;
    invariant(signer, "Signer not set");
    const signerChainId = await signer.getChainId();
    invariant(
      signerChainId === safeChainId,
      "Signer chainId does not match safeChainId",
    );
    invariant(safeAddress, "Safe address not set");
    invariant(safeChainId, "ChainId not set");
    const serverUrl = CHAIN_ID_TO_GNOSIS_SERVER_URL[safeChainId];
    invariant(serverUrl, "Chain not supported");
    const service = new SafeService(serverUrl);
    const ethAdapter = new EthersAdapter({ ethers, signer });
    const safe = await Safe.create({
      ethAdapter,
      safeAddress,
    });
    const provider = signer.provider;
    return new SafeEthersSigner(safe, service, provider);
  }

  async disconnect(): Promise<void> {
    this.config = undefined;
    this.safeSigner = undefined;
    this.personalSigner = undefined; // TODO make this the new connector
    return undefined;
  }

  async getAccount(): Promise<string> {
    const signer = await this.getSigner();
    return await signer.getAddress();
  }

  async getChainId(): Promise<number> {
    return (await this.getSigner()).getChainId();
  }

  async getProvider() {
    return (await this.getSigner()).provider;
  }

  async getSigner(): Promise<Signer> {
    if (!this.safeSigner) {
      this.safeSigner = await this.createSafeSigner();
    }
    return this.safeSigner;
  }

  async isAuthorized(): Promise<boolean> {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  protected onAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      this.emit("disconnect");
    } else {
      this.emit("change", { account: getAddress(accounts[0]) });
    }
  }

  protected override isChainUnsupported(chainId: number) {
    console.info("isChainUnsupported", chainId);
    return this.config?.safeChainId
      ? chainId === this.config.safeChainId
      : false;
  }

  protected onChainChanged(chainId: string | number) {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit("change", { chain: { id, unsupported } });
  }

  protected onDisconnect() {
    this.emit("disconnect");
  }

  public setConfiguration(signer: Signer, config: GnosisConnectorArguments) {
    this.personalSigner = signer;
    this.config = config;
  }
}
