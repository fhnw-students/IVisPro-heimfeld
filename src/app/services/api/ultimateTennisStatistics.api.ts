import Vue from 'vue';

import { plainToClass } from 'class-transformer';
import { Player } from '@/app/models/Player';
import { PagedMatches } from '@/app/models/PagedMatches';

const atpApiConfig = {
  baseURL: 'http://www.ultimatetennisstatistics.com',
};

export async function findHead2HeadStats(player: Player, opponent: Player): Promise<PagedMatches> {
  const response = await Vue.$http.get(`/matchesTable?playerId=${player.id}&opponent=OPP_${opponent.id}&
  h2h=true&current=1&rowCount=-1&sort%5B
  date%5D=desc&searchPhrase=&season=&fromDate=&toDate=&level=&bestOf=&surface=&indoor=&round=&tournamentId=
  &score=&outcome=&_=1527608334235`, Object.assign(atpApiConfig, {}));
  return plainToClass<PagedMatches, PagedMatches>(PagedMatches, response.data);
}
