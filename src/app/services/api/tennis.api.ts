import Vue from 'vue';

import { plainToClass } from 'class-transformer';

import { Contributor } from '@/app/models/Contributor';

const atpApiConfig = {
  baseURL: 'http://www.ultimatetennisstatistics.com',
};

/*
http://www.atpworldtour.com/en/rankings/singles?rankDate=2018-05-14&rankRange=0-100&countryCode=all&ajax=true
*/

/**
 * @name getContributors
 * @description Gets all the contributors of this repository.
 * @returns List of contributors.
 */
export async function getContributors(playerId: string, opponentId: string, ): Promise<Contributor[]> {
  const response = await Vue.$http.get(`/matchesTable?playerId=${playerId}&opponent=OPP_${opponentId}&h2h=true&current=1&rowCount=-1&sort%5Bdate%5D=desc&searchPhrase=&season=&fromDate=&toDate=&level=&bestOf=&surface=&indoor=&round=&tournamentId=&score=&outcome=&_=1527608334235`, Object.assign(atpApiConfig, {}));
  return plainToClass<Contributor, Contributor[]>(Contributor, response.data);
}


/*

// All games between two players
http://www.ultimatetennisstatistics.com/matchesTable?playerId=3819&opponent=OPP_4742&h2h=true&current=1&rowCount=-1&sort%5Bdate%5D=desc&searchPhrase=&season=&fromDate=&toDate=&level=&bestOf=&surface=&indoor=&round=&tournamentId=&score=&outcome=&_=1527608334235

// Search for player
http://www.ultimatetennisstatistics.com/autocompletePlayer?term=waw
*/


https://codepen.io/NilsWe/pen/FemfK/


https://codyhouse.co/demo/vertical-timeline/index.html
