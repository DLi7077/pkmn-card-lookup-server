import EnglishNames from "./en-pokemon-names";
import JapaneseNames from "./jp-pokemon-names";

export function englishToJapanese(name: string) {
  return JapaneseNames[EnglishNames[name]];
}

const japaneseToEnglishMapping: Map<String, EnglishNames> = new Map(
  Object.keys(JapaneseNames).map((name) => [
    JapaneseNames[name],
    EnglishNames[name as EnglishNames],
  ])
);

console.table(japaneseToEnglishMapping);

export function japaneseToEnglish(name: string) {
  return japaneseToEnglishMapping.get(name);
}
