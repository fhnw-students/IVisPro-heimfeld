import Vue from 'vue';

import { plainToClass } from 'class-transformer';

import { Contributor } from '@/app/models/Contributor';

const atpApiConfig = {
  baseURL: 'http://www.atpworldtour.com/-/ajax',
};

/*
http://www.atpworldtour.com/en/rankings/singles?rankDate=2018-05-14&rankRange=0-100&countryCode=all&ajax=true
*/

/**
 * @name getContributors
 * @description Gets all the contributors of this repository.
 * @returns List of contributors.
 */
export async function getContributors(): Promise<Contributor[]> {
  const response = await Vue.$http.get('/StatsLeaderboard/TopFive/en/52week/all', Object.assign(atpApiConfig, {}));
  return plainToClass<Contributor, Contributor[]>(Contributor, response.data);
}
