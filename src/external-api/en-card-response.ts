export type EnCardResponse = {
  page: number;
  pageSize: string;
  count: number;
  totalCount: number;
  data: Record<string, any>[];
};
