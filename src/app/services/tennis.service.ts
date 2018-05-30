import { PagedMatches } from './../models/PagedMatches';
import Vue from 'vue';

import { appConfig } from '@/config/app.config';
import { Player } from '@/app/models/Player';
import * as ultimateTennisStatisticsApi from '@/app/services/api/ultimateTennisStatistics.api';
import * as ultimateTennisStatisticsMock from '@/app/services/mock/ultimateTennisStatistics.mock';

export async function findHead2HeadStats(player: Player, opponent: Player): Promise<PagedMatches> {
  if (appConfig.fetchData === 'MOCK') {
    return ultimateTennisStatisticsMock.findHead2HeadStats(player, opponent);
  } else {
    return ultimateTennisStatisticsApi.findHead2HeadStats(player, opponent);
  }
}
