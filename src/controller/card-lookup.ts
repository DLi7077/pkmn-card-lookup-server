import { Request, Response, Router } from "express";
import EnglishNames from "../misc/en-pokemon-names";
import findJapaneseCards from "../scrapers/jp/jp-card-lookup";

const cardLookupRouter = Router();

async function getPokemonNames(
  request: Request,
  response: Response
): Promise<void> {
  response.status(200).json(Object.values(EnglishNames));
}

async function findEnglishCard(
  request: Request,
  response: Response
): Promise<void> {}

type JapaneseCardQuery = {
  name: EnglishNames;
  existingIds: string[];
};
async function findJapaneseCard(
  request: Request,
  response: Response
): Promise<void> {
  const query: JapaneseCardQuery = {
    name: request.query.name as EnglishNames,
    existingIds: (request.query.existingIds as string).split(","),
  };
  try {
    const cards = await findJapaneseCards(query.name, query.existingIds);

    response.status(200).json(cards);
  } catch (error) {
    response.status(400).json({
      error: (error as Error).message,
    });
  }
}

cardLookupRouter.get("/names", getPokemonNames);
cardLookupRouter.get("/en", findEnglishCard);
cardLookupRouter.get("/jp", findJapaneseCard);

export default cardLookupRouter;
