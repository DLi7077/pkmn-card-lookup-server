import { Request, Response, Router } from "express";
import { englishToJapanese } from "../misc/name-translation-mapping";

const cardLookupRouter = Router();

async function findEnglishCard(
  request: Request,
  response: Response
): Promise<void> {}

type JapaneseCardQuery = {
  name: string;
  existingIds: string[];
};
async function findJapaneseCard(
  request: Request,
  response: Response
): Promise<void> {
  const query: JapaneseCardQuery = {
    name: request.query.name as string,
    existingIds: request.query.existingIds,
  };

  response.status(200).json({
    name: englishToJapanese(query.name),
    existingIds: query.existingIds ?? [],
  });
}

cardLookupRouter.get("/en", findEnglishCard);
cardLookupRouter.get("/jp", findJapaneseCard);

export default cardLookupRouter;
