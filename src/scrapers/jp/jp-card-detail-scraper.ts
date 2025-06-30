import { JSDOM } from "jsdom";
import { CardDetails } from "../card-details";

export default function pullCardDetails(html: string): CardDetails {
  const document = new JSDOM(html).window.document!;

  const subdetailsSection = document.querySelector(
    `[class="subtext Text-fjalla"]`
  )!;
  const rarityElement = subdetailsSection.querySelectorAll("img")[1];

  return {
    cardName: document.querySelector(`[class="Heading1 mt20"]`)!.textContent!,
    cardImgUrl:
      `https://www.pokemon-card.com` +
      document.querySelector<HTMLImageElement>(`[class="fit"]`)!.src,
    setCardId: document
      .querySelector<HTMLElement>(`[class="subtext Text-fjalla"]`)!
      .textContent!.trim(),
    artist: document.querySelector(`[class="author"]`)!.querySelector("a")!
      .textContent!,
    set: document.querySelector(`[class="List_item"]`)!.textContent!,
    setId: subdetailsSection.querySelectorAll("img")[0].alt,
    rarity: !!rarityElement
      ? rarityElement.src
          .split("/assets/images/card/rarity/ic_rare_")[1]
          .split(/[_,\.]+/)[0]
          .toUpperCase()
      : "C", // rarity image will be missing for commons
      // rarity url looks like: `/assets/images/card/rarity/ic_rare_rr.gif`
  };
}
