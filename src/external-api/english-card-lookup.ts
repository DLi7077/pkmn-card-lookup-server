import axios from "axios";
import { EnCardResponse } from "./en-card-response";

export async function fetchEnglishCardList(
  englishName: string,
  page: number
): Promise<EnCardResponse> {
  return axios.get(`https://api.pokemontcg.io/v2/cards`, {
    params: {
      q: `name=${englishName}`,
      pageSize: 250,
      page: page,
    },
  });
}

export async function getEnglishCardsByName(name: string) {
  let maxPage = 1;
  let currPage = 1;
  const cards = [];

  while (currPage <= maxPage) {}
}

// export async function getCards(query: pokemonTcgQuery): Promise<Pokemon[]> {
//   const result: Pokemon[] = [];

//   await axios
//     .get(`https://api.pokemontcg.io/v2/cards`, {
//       params: {
//         q: queryToString(query),
//         orderBy: `-set.releaseDate,id`,
//         pageSize: 250,
//         page: 1, // Todo: add api pagination when user reaches last page
//       },
//       headers: {
//         "X-Api-Key": "25e2dc79-cf29-41cd-87d4-7ada4afa16b7",
//       },
//       maxBodyLength: Infinity,
//     })
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     .then((response: any) => {
//       const { data } = response.data;
//       result.push(
//         ...data.map(
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           (pokemon: any) => ({
//             id: pokemon.id,
//             set_id: pokemon.set.id,
//             set: pokemon.set.name,
//             set_card_id: pokemon.number,
//             set_logo: pokemon.set.images.logo,
//             set_icon: pokemon.set.images.symbol,
//             set_printed_total: pokemon.set.printedTotal,
//             artist: pokemon.artist,
//             name: pokemon.name,
//             rarity: pokemon.rarity,
//             tcg_player_url: pokemon.tcgplayer?.url,
//             sm_img_url: pokemon.images.small,
//             lg_img_url: pokemon.images.large,
//             price:
//               pokemon.tcgplayer?.prices?.holofoil?.market ??
//               pokemon.cardmarket?.prices?.trendPrice,
//           })
//         )
//       );
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   // }
//   return result;
// }
