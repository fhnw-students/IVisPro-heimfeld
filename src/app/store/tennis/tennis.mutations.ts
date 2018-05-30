import Vue from 'vue';
import { MutationTree } from 'vuex';

import { PagedMatches } from '@/app/models/PagedMatches';
import { Match } from '@/app/models/Match';
import * as mutationTypes from './tennis.mutations.types';
import { TennisState } from './tennis.state';
import { Head2Head } from './tennis.actions';

export const mutations: MutationTree<TennisState> = {

  [mutationTypes.LOAD_HEAD_2_HEAD_STATS_REQUESTED](state: TennisState): void {
    state.isFetching = true;
    state.error = undefined;
  },

  [mutationTypes.LOAD_HEAD_2_HEAD_STATS_FAILED](state: TennisState, error: any): void {
    state.isFetching = false;
    state.error = error;
  },

  [mutationTypes.SET_NEW_HEAD_2_HEAD](state: TennisState, head2Head: Head2Head): void {
    state.player = head2Head.player;
    state.opponent = head2Head.opponent;
  },

  [mutationTypes.LOAD_HEAD_2_HEAD_STATS_SUCCESS](state: TennisState, pagedMatches: PagedMatches): void {
    state.isFetching = true;
    state.error = undefined;
    state.rawMatches = pagedMatches.rows;
  },

  [mutationTypes.SET_FILTERED_MATCHES](state: TennisState, matches: Match[]): void {
    state.filteredMatches = matches;
  },

};
