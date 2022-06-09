import { resolveIpfsUri, resolveMimeType } from "./ipfs";
import { DEFAULT_IPFS_GATEWAY } from "@thirdweb-dev/sdk/dist/browser";
import { describe, expect, test } from "vitest";

describe("resolveIpfsUri", () => {
  test("with defaults", () => {
    const uri = "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
    const expected = `${DEFAULT_IPFS_GATEWAY}QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG`;
    expect(resolveIpfsUri(uri)).toBe(expected);
  });

  test("with explicit gateway url", () => {
    const uri = "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
    const gatewayUrl = "https://ipfs.io/ipfs/";
    const expected =
      "https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
    expect(resolveIpfsUri(uri, { gatewayUrl })).toBe(expected);
  });

  test("with undefined value", () => {
    expect(resolveIpfsUri(undefined)).toBe(undefined);
  });
});

const withExtensionCases = [
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
  [".ogv", "video/ogg"],
  [".mov", "video/quicktime"],
  [".mp3", "audio/mpeg"],
  [".wav", "audio/wav"],
  [".ogg", "audio/ogg"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".gif", "image/gif"],
  [".svg", "image/svg+xml"],
  [".pdf", "application/pdf"],
  [".txt", "text/plain"],
  [".md", "text/markdown"],
  [".html", "text/html"],
  [".htm", "text/html"],
  [".xml", "application/xml"],
  [".json", "application/json"],
];

const withoutExtensionCases = [
  [
    "svg",
    "ipfs://QmTqZhR6f7jzdhLgPArDPnsbZpvvgxzCZycXK7ywkLxSyU",
    "image/svg+xml",
  ],
  [
    "mp3",
    "ipfs://QmP9LdmomTYrMP6Y5ryNxgswZ6YB7ackMv45Kg1GC9t3yJ",
    "audio/mpeg",
  ],
  ["wav", "ipfs://QmXME2ZqsiQPckk3R7eCKBShHFCPqWa6z94YHJJcBPi7jm", "audio/wav"],
  ["aac", "ipfs://Qma87fckWtGtdVdh1JdzM8FzUKRFg6w8v2MrD82cL5aAaa", "audio/aac"],
  ["ogv", "ipfs://QmNNsW1ip5gazVCN4LTYvArXtgYVVZEWw6DvBThgSjiGM3", "video/ogg"],
  ["mp4", "ipfs://Qmb9ZV5yznE4C4YvyJe8DVFv1LSVkebdekY6HjLVaKmHZi", "video/mp4"],
  ["gif", "ipfs://QmNzw26F56V2q2TGCLtfJnrSzB7UH3zYdZpyLpmdw47R8D", "image/gif"],
  [
    "html",
    "ipfs://QmYQR3yKyNh3xiAPpeY6xG5utUW63JAHyn8Xmb8DDCnmYr",
    "text/html",
  ],
  [
    "pdf",
    "ipfs://Qmb45t8VyE3sLdCeUzbGnDAAzjWZ9QMwfCdmBxiBvDxgTy",
    "application/pdf",
  ],
  [
    "text",
    "ipfs://QmcQwYWjHyLp3ndwWmxFEtbX9jFSLDdJtnckjT4umvQ7mM",
    "text/plain",
  ],
];

describe("resolveMimeType", () => {
  describe("with known extension", () => {
    test.each(withExtensionCases)("%p", (extension, expected) => {
      expect(
        resolveMimeType(`https://example.com/test${extension}`),
      ).resolves.toBe(expected);
    });
  });

  describe("using head request", () => {
    test.each(withoutExtensionCases)("%p", (_type, ipfsHash, expected) => {
      expect(resolveMimeType(resolveIpfsUri(ipfsHash))).resolves.toBe(expected);
    });
  });

  test("unrecognized url resolves to undefined", () => {
    expect(resolveMimeType("https://example.com/test.foo")).resolves.toBe(
      undefined,
    );
  });

  test("undefined input resolves to undefined", () => {
    expect(resolveMimeType(undefined)).resolves.toBe(undefined);
  });
});
