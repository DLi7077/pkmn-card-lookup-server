import EnglishNames from "./en-pokemon-names";
import JapaneseNames from "./jp-pokemon-names";

export function englishToJapanese(name: EnglishNames) {
  const jpName = JapaneseNames[EnglishNames[name]];
  if (!jpName) throw new Error(`${name} is not a recorded English name`);

  return jpName;
}

const japaneseToEnglishMapping: Map<String, EnglishNames> = new Map(
  Object.keys(EnglishNames).map((name) => [
    JapaneseNames[name as EnglishNames] as string,
    EnglishNames[name as EnglishNames],
  ])
);

console.table(japaneseToEnglishMapping);

export function japaneseToEnglish(name: string) {
  const enName = japaneseToEnglishMapping.get(name);
  if (!enName) throw new Error(`${name} is not a recorded Japanese name`);

  return enName;
}
