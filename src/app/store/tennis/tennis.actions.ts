import { ActionContext, ActionTree } from 'vuex';

import * as mutationTypes from './tennis.mutations.types';
import { TennisState } from './tennis.state';
import { Player } from '@/app/models/Player';

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
    // TODO: Filter matches with the given filter object like surface...

    commit(mutationTypes.SET_FILTERED_MATCHES, state.playedMatches);
  },
  [actionTypes.SET_FILTER_SURFACE]({ commit }: ActionContext<TennisState, TennisState>, selectedSurface: string): void {
    commit(mutationTypes.SET_FILTER_SURFACE, selectedSurface);
  },
  [actionTypes.SET_FILTER_TOURNAMENT]({ commit }: ActionContext<TennisState, TennisState>, selectedTournament: string): void {
    commit(mutationTypes.SET_FILTER_TOURNAMENT, selectedTournament);
  },
  [actionTypes.SET_FILTER_YEAR]({ commit }: ActionContext<TennisState, TennisState>, selectedYear: string): void {
    commit(mutationTypes.SET_FILTER_YEAR, selectedYear);
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  [actionTypes.CALCULATE_STATS]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): void {
    commit(mutationTypes.CALCULATE_STATS);
    commit(mutationTypes.SET_NEW_HEAD_2_HEAD, {
      player: state.player,
      opponent: state.opponent,
    });

  },
};
