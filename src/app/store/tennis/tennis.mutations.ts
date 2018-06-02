import Vue from 'vue';
import { MutationTree } from 'vuex';
import { plainToClass, classToClass } from 'class-transformer';

import { Match } from '@/app/models/Match';
import * as mutationTypes from './tennis.mutations.types';
import { TennisState } from './tennis.state';
import { Head2Head } from './tennis.actions';
import { Ranking } from '@/app/models/Ranking';
import { Player } from '@/app/models/Player';

import matchesJson from '@/data/matches.json';
import playersJson from '@/data/players.json';
import rankingsJson from '@/data/rankings.json';

const log = Vue.$createLogger('tennis-mutations');

export const mutations: MutationTree<TennisState> = {

  [mutationTypes.INIT_DATA](state: TennisState): void {
    state.isInitialized = true;
    state.error = undefined;

    state.players = plainToClass(Player, playersJson);
    state.rankings = plainToClass(Ranking, rankingsJson);
    state.matches = plainToClass(Match, matchesJson);
    log.info(`Loaded ${state.players.length} players`);
    log.info(`Loaded ${state.rankings.length} rankings`);
    log.info(`Loaded ${state.matches.length} matches`);
  },

  [mutationTypes.LOAD_HEAD_2_HEAD_STATS_REQUESTED](state: TennisState): void {
    state.isFetching = true;
    state.error = undefined;
  },

  [mutationTypes.LOAD_HEAD_2_HEAD_STATS_FAILED](state: TennisState, error: any): void {
    state.isFetching = false;
    state.error = error;
  },

  [mutationTypes.SET_PLAYED_MATCHES](state: TennisState, playedMatches: Match[]): void {
    log.info(`Found ${playedMatches.length} matches of the selected players`);
    state.playedMatches = playedMatches;
  },

  [mutationTypes.CALCULATE_STATS](state: TennisState, playedMatches: Match[]): void {
    state.player.wins = state.filteredMatches.filter((m) => m.winner.id === state.player.id).length;
    state.opponent.wins = state.filteredMatches.filter((m) => m.winner.id === state.opponent.id).length;

    state.player.ranking = state.rankings.filter((ranking) => ranking.id === state.player.id)[0];
    state.opponent.ranking = state.rankings.filter((ranking) => ranking.id === state.opponent.id)[0];

    state.player = Object.assign(new Player(), state.player);
    state.opponent = Object.assign(new Player(), state.opponent);
  },

  [mutationTypes.SET_NEW_HEAD_2_HEAD](state: TennisState, head2Head: Head2Head): void {
    state.player = head2Head.player;
    state.opponent = head2Head.opponent;
  },

  [mutationTypes.SET_FILTERED_MATCHES](state: TennisState, matches: Match[]): void {
    state.filteredMatches = matches;
  },

  [mutationTypes.SET_FILTER_SURFACE](state: TennisState, surface: string): void {
    state.filters.surface = surface;
  },

  [mutationTypes.SET_FILTER_YEAR](state: TennisState, year: string): void {
    state.filters.year = year;
  },

  [mutationTypes.SET_FILTER_TOURNAMENT](state: TennisState, tournament: string): void {
    state.filters.tournament = tournament;
  },

};
