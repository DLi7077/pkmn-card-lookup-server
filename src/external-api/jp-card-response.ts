export type JpCardResponse = {
  result: number;
  errMsg: string;
  thisPage: number;
  maxPage: number;
  hitCnt: number;
  cardStart: number;
  cardEnd: number;
  searchCondition: string[];
  regulation: number;
  cardList: JpCardData[];
};

export type JpCardData = {
  cardID: string;
  cardThumbFile: string;
  cardNameAltText: string;
  cardNameViewText: string;
};
