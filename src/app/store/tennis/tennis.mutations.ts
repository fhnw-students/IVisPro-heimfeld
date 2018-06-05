import { setsAmountTransformer } from './../../models/transformers/score.transformer';
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { plainToClass, classToClass } from 'class-transformer';

import { Match, MatchJson } from '@/app/models/Match';
import * as mutationTypes from './tennis.mutations.types';
import { TennisState } from './tennis.state';
import { Head2Head } from './tennis.actions';
import { Ranking } from '@/app/models/Ranking';
import { Player } from '@/app/models/Player';

const log = Vue.$createLogger('tennis-mutations');

export const mutations: MutationTree<TennisState> = {

  [mutationTypes.INIT_DATA](state: TennisState, data: any): void {
    state.players = data.players;
    state.rankings = data.rankings;
    state.matches = data.matches;
    log.info(`Loaded ${state.players.length} players`);
    log.info(`Loaded ${state.rankings.length} rankings`);
    log.info(`Loaded ${state.matches.length} matches`);
  },

  [mutationTypes.SET_PLAYED_MATCHES](state: TennisState, playedMatches: MatchJson[]): void {
    log.info(`Found ${playedMatches.length} matches of the selected players`);
    state.playedMatches = playedMatches;
  },

  [mutationTypes.SET_NEW_HEAD_2_HEAD](state: TennisState, head2Head: Head2Head): void {
    state.player = Object.assign(new Player(), state.player, head2Head.player);
    state.opponent = Object.assign(new Player(), state.opponent, head2Head.opponent);
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

  [mutationTypes.SET_FILTERING](state: TennisState, isFiltering: boolean): void {
    state.isFiltering = isFiltering;
  },

  [mutationTypes.SET_CALCULATING](state: TennisState, isCalculating: boolean): void {
    state.isCalculating = isCalculating;
  },

  [mutationTypes.SET_INITIALIZED](state: TennisState, isInitialized: boolean): void {
    state.isInitialized = isInitialized;
  },

};
