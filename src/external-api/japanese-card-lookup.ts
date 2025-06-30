import axios from "axios";
import _ from "lodash";
import { JpCardData, JpCardResponse } from "./jp-card-response";
import pullCardDetails from "../scrapers/jp/jp-card-detail-scraper";
import { CardDetails } from "../scrapers/card-details";

async function fetchJapaneseCardList(
  jpName: string,
  page: number
): Promise<JpCardResponse> {
  return axios
    .get(`https://www.pokemon-card.com/card-search/resultAPI.php`, {
      params: {
        // trust the process
        keyword: jpName,
        regulation_sidebar_form: "all",
        sm_and_keyword: "true",
        page: page,
      },
    })
    .then((response) => response.data)
    .catch(console.error);
}

export async function getJapaneseCardIds(
  jpName: string
): Promise<JpCardData[]> {
  let maxPage = 1;
  let currPage = 1;
  const cardObjects: JpCardData[] = [];

  while (currPage <= maxPage) {
    const response = await fetchJapaneseCardList(jpName, currPage);
    maxPage = response.maxPage;
    cardObjects.push(...response.cardList);
    currPage++;
  }

  return cardObjects;
}

export async function getCardDataById(cardId: string): Promise<CardDetails> {
  const html = await axios
    .get(
      `https://www.pokemon-card.com/card-search/details.php/card/${cardId}/regu/all`
    )
    .then((response) => response.data)
    .catch(console.error);

  return pullCardDetails(html);
}
