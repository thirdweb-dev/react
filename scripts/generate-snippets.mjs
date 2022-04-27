import { DocExcerpt, TSDocParser } from "@microsoft/tsdoc";
import fs from "fs";

/**
 * This is a simplistic solution until we implement proper DocNode rendering APIs.
 */
export class Formatter {
  static renderDocNode(docNode) {
    let result = "";
    if (docNode) {
      if (docNode instanceof DocExcerpt) {
        result += docNode.content.toString();
      }
      for (const childNode of docNode.getChildNodes()) {
        result += Formatter.renderDocNode(childNode);
      }
    }
    return result;
  }

  static renderDocNodes(docNodes) {
    let result = "";
    for (const docNode of docNodes) {
      result += Formatter.renderDocNode(docNode);
    }
    return result;
  }
}

const tsdocParser = new TSDocParser();

const json = JSON.parse(
  fs.readFileSync(`${process.cwd()}/temp/react.api.json`, "utf8"),
);

function languageNameToKey(languageName) {
  switch (languageName) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "tyepscript";
    default:
      return languageName;
  }
}

const CONTRACT_HOOKS = [
  "useNFTCollection",
  "useEdition",
  "useToken",
  "useMarketplace",
  "useNFTDrop",
  "useEditionDrop",
  "useSplit",
  "useVote",
  "usePack",
];

const hooks = json.members[0].members.filter(
  (m) => m.kind === "Function" && CONTRACT_HOOKS.includes(m.name),
);

function parseExampleTag(docComment) {
  const exampleBlocks = docComment._customBlocks.filter(
    (b) => b._blockTag._tagName === "@example",
  );

  const examplesString = Formatter.renderDocNodes(exampleBlocks);

  const regex = /```([a-zA-Z]*)\n([\S\s]*?)\n```/g;

  let matches;

  const examples = {};

  while ((matches = regex.exec(examplesString)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    examples[languageNameToKey(matches[1])] = matches[2];
  }
  return examples;
}

const baseDocUrl = "https://docs.thirdweb.com/typescript/react.";

const extractReferenceLink = (m, kind, contractName) => {
  if (kind === "Property") {
    return m.excerptTokens
      .filter((e) => e.kind === "Reference")
      .map((e) => `${baseDocUrl}${e.text.toLowerCase()}`)[0];
  }
  if (kind === "Method") {
    return `${baseDocUrl}${contractName}.${m.name}`;
  }
  return `${baseDocUrl}${m.name}`;
};

const moduleMap = hooks.reduce((acc, m) => {
  const parserContext = tsdocParser.parseString(m.docComment);
  const docComment = parserContext.docComment;
  const examples = parseExampleTag(docComment);

  if (Object.keys(examples).length > 0) {
    acc[m.name] = {
      name: m.name,
      summary: Formatter.renderDocNode(docComment.summarySection),
      examples,
      reference: extractReferenceLink(m),
    };
  }

  return acc;
}, {});

fs.writeFileSync(
  `${process.cwd()}/docs/snippets.json`,
  JSON.stringify(moduleMap, null, 2),
);
