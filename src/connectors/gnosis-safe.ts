import Safe from "@gnosis.pm/safe-core-sdk";
import { SafeEthersSigner, SafeService } from "@gnosis.pm/safe-ethers-adapters";
import EthersAdapter from "@gnosis.pm/safe-ethers-lib";
import { Signer, ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import invariant from "tiny-invariant";
import { Chain, Connector, ConnectorData, normalizeChainId } from "wagmi";

export interface GnosisConnectorArguments {}

export class GnosisSafeConnector extends Connector {
  id: string = "gnosis";
  ready: boolean = true;
  name: string = "Gnosis Safe";
  // config
  personalSigner?: Signer;
  safeAddress?: string;

  constructor(config: { chains?: Chain[]; options: GnosisConnectorArguments }) {
    super({ ...config, options: config?.options });
  }

  async connect(): Promise<ConnectorData<any>> {
    const account = await this.getAccount();
    const provider = await this.getProvider();
    const id = await this.getChainId();
    return {
      account,
      provider,
      chain: { id, unsupported: this.isChainUnsupported(id) },
    };
  }
  disconnect(): Promise<void> {
    throw new Error("Method not implemented.");
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
    const signer = this.personalSigner;
    const safeAddress = this.safeAddress;
    invariant(signer, "Signer not set");
    invariant(safeAddress, "Safe address not set");
    const service = new SafeService(
      "https://safe-transaction.rinkeby.gnosis.io",
    );
    const ethAdapter = new EthersAdapter({ ethers, signer });
    const safe = await Safe.create({
      ethAdapter,
      safeAddress,
    });
    const provider = signer.provider;
    return new SafeEthersSigner(safe, service, provider);
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
    return !this.chains.some((x) => x.id === chainId);
  }

  protected onChainChanged(chainId: string | number) {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit("change", { chain: { id, unsupported } });
  }

  protected onDisconnect() {
    this.emit("disconnect");
  }

  public setConfiguration(signer: Signer, safeAddress: string) {
    this.personalSigner = signer;
    this.safeAddress = safeAddress;
  }
}
