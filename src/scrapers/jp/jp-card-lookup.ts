import {
  getCardDataById,
  getJapaneseCardIds,
} from "../../external-api/japanese-card-lookup";
import EnglishNames from "../../misc/en-pokemon-names";
import { englishToJapanese } from "../../misc/name-translation-mapping";
import { randomNumberBetween, sleep } from "../../misc/utils";
import { CardDetails } from "../card-details";

export default async function findJapaneseCards(
  englishName: string,
  existingIds: string[]
): Promise<any> {
  const existingIdSet = new Set<String>(existingIds);
  const japaneseName = englishToJapanese(englishName as EnglishNames);
  const cardIds = (await getJapaneseCardIds(japaneseName))
    .map((cardData) => cardData.cardID)
    .filter((cardId) => !existingIdSet.has(cardId));
  console.log(
    `[${englishName} - ${japaneseName}] Looking up ${cardIds.length} cards`
  );

  const cards = await lookupCardsById({
    englishName,
    japaneseName,
    cardIds,
  });
  console.log(
    `[${englishName} - ${japaneseName}] Pulled ${cards.length} cards`
  );

  return cards;
}

// blocking task that looks up card details by id
// sleep for a random amount of time between each card to avoid rate limit/bot detection
async function lookupCardsById({
  englishName,
  japaneseName,
  cardIds,
}: {
  englishName: string;
  japaneseName: string;
  cardIds: string[];
}): Promise<CardDetails[]> {
  const cards: CardDetails[] = [];
  for (const cardId of cardIds) {
    const taskDelay = randomNumberBetween(1, 1.5) * 1000;
    await sleep(taskDelay);
    console.log(`[${cardId}] Retrieving card details`);
    const response = await getCardDataById(cardId);
    const cardDetails = {
      ...response,
      name: englishName,
      language: "JP",
      cardId: cardId,
    };

    cards.push(cardDetails);
    console.log(`[${cardId}] Pulled card details`);
  }

  return cards;
}
