import { defaultSupportedChains } from "../constants/chain";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
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
  readonly name = "gnosis";
  ready = true;

  private magic?: Magic;
  private provider?: Web3Provider;
  override options: MagicConnectorOptions;

  private email = "";

  constructor(config: { chains?: Chain[]; options?: any }, initialEmail = "") {
    super({ ...config, options: config?.options });
    this.options = config?.options;
    this.email = initialEmail;
    this.updateMagic(this.options.desiredChainId);
  }

  async connect() {
    if (typeof window === "undefined") {
      return {
        account: undefined,
        chain: undefined,
        provider: undefined,
      };
    }

    if (!this.email) {
      return {
        account: undefined,
        chain: undefined,
        provider: undefined,
      };
    }

    await this.updateMagic(this.options.desiredChainId);

    if (!this.magic) {
      throw new ConnectorNotFoundError();
    }

    try {
      await this.magic.auth.loginWithMagicLink({ email: this.email });
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

    const provider = this.magic.rpcProvider;
    const account = await provider
      .enable()
      .then((accounts: string[]): string => accounts[0]);

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
    window.localStorage.setItem("tw::magic::email", "");
    this.magic?.user.logout();
  }

  async getAccount() {
    if (!this.magic) {
      throw new ConnectorNotFoundError();
    }

    return this.magic.rpcProvider
      .send("eth_accounts")
      .then((accounts: string[]): string => accounts[0]);
  }

  async getChainId() {
    if (!this.provider) {
      throw new ConnectorNotFoundError();
    }

    return this.options.desiredChainId;
  }

  getProvider(): Web3Provider {
    if (!this.provider) {
      this.updateMagic(this.options.desiredChainId);
    }

    return this.provider as Web3Provider;
  }

  private async updateMagic(chainId: number) {
    if (typeof window === "undefined") {
      return;
    }

    const chainData = defaultSupportedChains.find(
      (chain) => chain.id === chainId,
    );

    if (!chainData) {
      throw new Error(`Chain ${chainId} is not supported`);
    }

    this.magic = new Magic(this.options.apiKey, {
      network: {
        chainId: chainData.id,
        rpcUrl: chainData.rpcUrls[0],
      },
    });

    this.provider = new Web3Provider(
      this.magic.rpcProvider as unknown as ExternalProvider,
    );
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
