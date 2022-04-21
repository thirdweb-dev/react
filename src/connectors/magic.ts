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
  magicCredential: string;
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

  constructor(config: { chains?: Chain[]; options?: any }) {
    super({ ...config, options: config?.options });
    this.options = config?.options;
  }

  async connect() {
    if (!this.magic) {
      throw new ConnectorNotFoundError();
    }

    const isLoggedIn = await this.magic.user.isLoggedIn();
    const metadata = isLoggedIn ? await this.magic.user.getMetadata() : null;
    const loggedInEmail = metadata ? metadata.email : null;

    if (isLoggedIn) {
      if (this.email && loggedInEmail !== this.email) {
        await this.magic.user.logout();
      }
    }

    if (!isLoggedIn && this.options.silentEagerLogin) {
      throw new SilentEagerConnectError();
    }

    if (!isLoggedIn) {
      try {
        if (this.options.magicCredential) {
          await this.magic.auth.loginWithCredential(
            this.options.magicCredential,
          );
        } else if (this.email) {
          await this.magic.auth.loginWithMagicLink({
            email: this.email,
            redirectURI: new URL(this.options.redirect, window.location.origin)
              .href,
            showUI: false,
          });
        }
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
    }

    const provider = this.magic.rpcProvider;
    const account = await provider
      .enable()
      .then((accounts: string[]): string => accounts[0]);

    if (account && window.localStorage) {
      const refreshedToken = await this.magic.user.getIdToken({
        // 90 days
        lifespan: 90 * 24 * 60 * 60,
      });

      if (refreshedToken) {
        window.localStorage.setItem("magic.magic_credential", refreshedToken);
      }
    }

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
    window.localStorage.setItem("magic.email", "");
    window.localStorage.setItem("magic.magic_credential", "");
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
