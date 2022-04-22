import { defaultSupportedChains } from "../constants/chain";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import {
  InstanceWithExtensions,
  MagicSDKExtensionsOption,
  SDKBase,
} from "@magic-sdk/provider";
import { getAddress } from "ethers/lib/utils";
import { Magic, RPCError, RPCErrorCode } from "magic-sdk";
import {
  Chain,
  Connector,
  ConnectorNotFoundError,
  normalizeChainId,
} from "wagmi";

export type MagicConnectorOptions = {
  apiKey: string;
  desiredChainId: number;
  redirect: string;
  silentEagerLogin?: boolean;
};

export class ConnectorError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "Connector error.";
  }
}

export class SilentEagerConnectError extends ConnectorError {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "Silent eager error.";
  }
}

export class UserRejectedRequestError extends ConnectorError {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "The user rejected the request.";
  }
}

export class FailedVerificationError extends ConnectorError {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "The email verification failed.";
  }
}

export class MagicLinkRateLimitError extends ConnectorError {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "The Magic rate limit has been reached.";
  }
}

export class MagicLinkExpiredError extends ConnectorError {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "The Magic link has expired.";
  }
}

export class MagicConnector extends Connector {
  readonly id = "magic";
  readonly name = "Magic";
  readonly ready = true;

  override options: MagicConnectorOptions;
  private email = "";

  constructor(config: { chains?: Chain[]; options?: any }) {
    super({ ...config, options: config?.options });
    this.options = config?.options;
  }

  async connect() {
    if (!this.email) {
      throw Error("Email is not currently set.");
    }

    const magic = this.getMagic();

    try {
      await magic.auth.loginWithMagicLink({ email: this.email });
      window.localStorage.setItem("tw::magic::email", this.email);
    } catch (err) {
      if (!(err instanceof RPCError)) {
        throw err;
      }
      if (err.code === RPCErrorCode.MagicLinkFailedVerification) {
        throw new FailedVerificationError();
      }
      if (err.code === RPCErrorCode.MagicLinkExpired) {
        throw new MagicLinkExpiredError();
      }
      if (err.code === RPCErrorCode.MagicLinkRateLimited) {
        throw new MagicLinkRateLimitError();
      }
      // This error gets thrown when users close the login window.
      // -32603 = JSON-RPC InternalError
      if (err.code === -32603) {
        throw new UserRejectedRequestError();
      }
    }

    const provider = this.getProvider();
    const account = await this.getProvider().getSigner().getAddress();

    return {
      account,
      provider,
      chain: {
        id: this.options.desiredChainId,
        unsupported: this.isChainUnsupported(this.options.desiredChainId),
      },
    };
  }

  async disconnect() {
    this.getMagic().user.logout();
  }

  async getAccount() {
    return this.getProvider().getSigner().getAddress();
  }

  async getChainId() {
    if (!this.getProvider()) {
      throw new ConnectorNotFoundError();
    }

    return this.options.desiredChainId;
  }

  getProvider(): Web3Provider {
    return new Web3Provider(
      this.getMagic().rpcProvider as unknown as ExternalProvider,
    );
  }

  private getMagic(): InstanceWithExtensions<
    SDKBase,
    MagicSDKExtensionsOption<string>
  > {
    const chainData = defaultSupportedChains.find(
      (chain) => chain.id === this.options.desiredChainId,
    );

    if (!chainData) {
      throw new Error(`Chain ${this.options.desiredChainId} is not supported`);
    }

    return new Magic(this.options.apiKey, {
      network: {
        chainId: chainData.id,
        rpcUrl: chainData.rpcUrls[0],
      },
    });
  }

  async getSigner() {
    const provider = this.getProvider();
    return provider.getSigner();
  }

  async isAuthorized() {
    try {
      const account = this.getAccount();
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

  public setEmail(email: string) {
    this.email = email;
  }
}
