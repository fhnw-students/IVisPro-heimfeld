import { Match } from './../../models/Match';
import Vue from 'vue';
import * as _ from 'lodash';
import { ActionContext, ActionTree } from 'vuex';

import * as mutationTypes from './tennis.mutations.types';
import { TennisState } from './tennis.state';
import { Player } from '@/app/models/Player';
import { Match } from '@/app/models/Match';

const log = Vue.$createLogger('tennis-actions');

const sumReducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

// -------------------------------------------------------------------------
// Define Types & Interfaces
// -------------------------------------------------------------------------
export interface Head2Head {
  player: Player;
  opponent: Player;
}

// -------------------------------------------------------------------------
// Define Action Types
// -------------------------------------------------------------------------

export const actionTypes = {
  LOAD_HEAD_2_HEAD_STATS: 'LOAD_HEAD_2_HEAD_STATS',
  CALCULATE_STATS: 'CALCULATE_STATS',
  FILTER_MATCHES: 'FILTER_MATCHES',
  SET_FILTER_SURFACE: 'SET_FILTER_SURFACE',
  SET_FILTER_TOURNAMENT: 'SET_FILTER_TOURNAMENT',
  SET_FILTER_YEAR: 'SET_FILTER_YEAR',
  INIT: 'INIT',
};

// -------------------------------------------------------------------------
// Define Action Object
// -------------------------------------------------------------------------

export const actions: ActionTree<TennisState, TennisState> = {
  /**
   * Loads all the matches of the given head 2 head.
   */
  async [actionTypes.LOAD_HEAD_2_HEAD_STATS](
    { commit, state, dispatch }: ActionContext<TennisState, TennisState>,
    head2head: Head2Head
  ): Promise<void> {
    commit(mutationTypes.LOAD_HEAD_2_HEAD_STATS_REQUESTED);
    try {
      commit(mutationTypes.SET_NEW_HEAD_2_HEAD, head2head);

      const playedMatches = state.matches.filter((match) =>
        (match.winner.id === head2head.player.id && match.loser.id === head2head.opponent.id) ||
        (match.loser.id === head2head.player.id && match.winner.id === head2head.opponent.id));
      commit(mutationTypes.SET_PLAYED_MATCHES, playedMatches);

      dispatch(actionTypes.FILTER_MATCHES);
      dispatch(actionTypes.CALCULATE_STATS);
    } catch (error) {
      commit(mutationTypes.LOAD_HEAD_2_HEAD_STATS_FAILED, error);
    }
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  [actionTypes.INIT]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): void {
    commit(mutationTypes.INIT_DATA);
    dispatch(actionTypes.LOAD_HEAD_2_HEAD_STATS, {
      player: state.players.filter((player) => player.id === state.rankings[0].id)[0],
      opponent: state.players.filter((player) => player.id === state.rankings[1].id)[0],
    });
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  [actionTypes.FILTER_MATCHES]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): void {
    log.info('Start filtering matches for the head 2 head');
    let matches: Match[] = state.playedMatches;

    matches = matches.filter((match) => match.filterSurface(state.filters.surface));
    matches = matches.filter((match) => match.filterTournament(state.filters.tournament));
    matches = matches.filter((match) => match.filterYear(state.filters.year));
    matches = matches.sort((a: Match, b: Match) => b.date.diff(a.date));

    commit(mutationTypes.SET_FILTERED_MATCHES, matches);
    dispatch(actionTypes.CALCULATE_STATS);
  },
  [actionTypes.SET_FILTER_SURFACE]({ commit, dispatch }: ActionContext<TennisState, TennisState>, selectedSurface: string): void {
    commit(mutationTypes.SET_FILTER_SURFACE, selectedSurface);
    dispatch(actionTypes.FILTER_MATCHES);
  },
  [actionTypes.SET_FILTER_TOURNAMENT]({ commit, dispatch }: ActionContext<TennisState, TennisState>, selectedTournament: string): void {
    commit(mutationTypes.SET_FILTER_TOURNAMENT, selectedTournament);
    dispatch(actionTypes.FILTER_MATCHES);
  },
  [actionTypes.SET_FILTER_YEAR]({ commit, dispatch }: ActionContext<TennisState, TennisState>, selectedYear: string): void {
    commit(mutationTypes.SET_FILTER_YEAR, selectedYear);
    dispatch(actionTypes.FILTER_MATCHES);
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  [actionTypes.CALCULATE_STATS]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): void {
    const player = Object.assign(new Player(), state.player);
    const opponent = Object.assign(new Player(), state.opponent);

    if (state.filteredMatches && state.filteredMatches.length > 0) {
      player.wins = state.filteredMatches.filter((m) => m.winner.id === state.player.id).length;
      opponent.wins = state.filteredMatches.filter((m) => m.winner.id === state.opponent.id).length;

      player.sets = state.filteredMatches.map((m) =>
        m.winner.id === state.player.id ? m.winner.amountSets : m.loser.amountSets).reduce(sumReducer);
      opponent.sets = state.filteredMatches.map((m) =>
        m.winner.id === state.opponent.id ? m.winner.amountSets : m.loser.amountSets).reduce(sumReducer);

      player.games = state.filteredMatches.map((m) =>
        m.winner.id === state.player.id ? m.winner.amountGames : m.loser.amountGames).reduce(sumReducer);
      opponent.games = state.filteredMatches.map((m) =>
        m.winner.id === state.opponent.id ? m.winner.amountGames : m.loser.amountGames).reduce(sumReducer);
    } else {
      player.wins = 0;
      opponent.wins = 0;
      player.sets = 0;
      opponent.sets = 0;
      player.games = 0;
      opponent.games = 0;
    }

    player.ranking = state.rankings.filter((ranking) => ranking.id === state.player.id)[0];
    opponent.ranking = state.rankings.filter((ranking) => ranking.id === state.opponent.id)[0];

    commit(mutationTypes.SET_NEW_HEAD_2_HEAD, {
      player,
      opponent,
    });

  },
};
