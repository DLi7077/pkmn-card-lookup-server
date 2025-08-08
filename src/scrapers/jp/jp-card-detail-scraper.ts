import { JSDOM } from "jsdom";
import { CardDetails } from "../card-details";

export default function pullCardDetails(html: string): CardDetails {
  const document = new JSDOM(html).window.document!;

  const subdetailsSection = document.querySelector(
    `[class="subtext Text-fjalla"]`
  )!;
  const setName = getOrDefault(
    () => document.querySelector(`[class="List_item"]`)!.textContent!
  );
  const setCardId = getOrDefault(() =>
    document
      .querySelector<HTMLElement>(`[class="subtext Text-fjalla"]`)!
      .textContent!.trim()
  );

  return {
    cardName: document.querySelector(`[class="Heading1 mt20"]`)!.textContent!,
    imgUrl:
      `https://www.pokemon-card.com` +
      document.querySelector<HTMLImageElement>(`[class="fit"]`)!.src,
    setCardId: getOrDefault(() => parseInt(setCardId.split(/\s\/\s/)[0], 10)),
    setCardCount: getOrDefault(() =>
      parseInt(setCardId.split(/\s\/\s/)[1], 10)
    ),
    artist: getOrDefault(
      () =>
        document.querySelector(`[class="author"]`)!.querySelector("a")!
          .textContent!
    ),
    set: getOrDefault(() =>
      setName.slice(setName.indexOf("「") + 1, setName.indexOf("」"))
    ),
    setId: subdetailsSection.querySelectorAll("img")[0].alt,
    rarity: getRarity(document)!,
  };

  // rarity image will be missing for commons
  // rarity url looks like:
  // `/assets/images/card/rarity/ic_rare_rr.gif`
  // `/assets/images/card/rarity/ic_prismstar.gif`
  // Jumbo cards don't have rarities
  // https://www.pokemon-card.com/card-search/details.php/card/40208/regu/all
  function getRarity(document: Document) {
    const subdetailsSection = document.querySelector(
      `[class="subtext Text-fjalla"]`
    )!;
    const rarityElement = subdetailsSection.querySelectorAll("img")[1];

    if (!rarityElement) return "C"; // default to Common

    const rarityUrl = rarityElement.src;
    // Omit jumbo cards, as they come as 4 cards in 1 piece. Don't know how to handle that.
    if (!rarityUrl.includes("rarity")) return "N/A";

    return rarityUrl
      .split(".gif")[0] // ...ic_rare_rr.gif => ...ic_rare_rr
      .split("_")
      .at(-1); // ...ic_rare_rr => rr
  }

  function getOrDefault(nullableFunction: () => any, fallback = null) {
    try {
      return nullableFunction();
    } catch (error) {
      return fallback;
    }
  }
}
