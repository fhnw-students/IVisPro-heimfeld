import { Contributor } from './../../models/Contributor';
import { ActionContext, ActionTree } from 'vuex';

import * as tennisService from '@/app/services/tennis.service';
import * as mutationTypes from './tennis.mutations.types';
import { TennisState } from './tennis.state';
import { Player } from '@/app/models/Player';
import { PagedMatches } from '@/app/models/PagedMatches';

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
      const pagedMatches = await tennisService.findHead2HeadStats(head2head.player, head2head.opponent);
      commit(mutationTypes.SET_NEW_HEAD_2_HEAD, head2head);
      commit(mutationTypes.LOAD_HEAD_2_HEAD_STATS_SUCCESS, pagedMatches);
      dispatch(actionTypes.FILTER_MATCHES);
      dispatch(actionTypes.CALCULATE_STATS);
    } catch (error) {
      commit(mutationTypes.LOAD_HEAD_2_HEAD_STATS_FAILED, error);
    }
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  [actionTypes.FILTER_MATCHES]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): void {
    // TODO: Filter matches with the given filter object like surface...
    commit(mutationTypes.SET_FILTERED_MATCHES, state.rawMatches);
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  [actionTypes.CALCULATE_STATS]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): void {
    state.player.wins = state.filteredMatches.filter((m) => m.winner.id === state.player.id).length;
    state.opponent.wins = state.filteredMatches.filter((m) => m.winner.id === state.opponent.id).length;

    const lastMatch = state.filteredMatches[0];
    state.player.rank = lastMatch.winner.id === state.player.id ? lastMatch.winner.rank : lastMatch.loser.rank;
    state.opponent.rank = lastMatch.winner.id === state.opponent.id ? lastMatch.winner.rank : lastMatch.loser.rank;

    commit(mutationTypes.SET_NEW_HEAD_2_HEAD, {
      player: state.player,
      opponent: state.opponent,
    });

  },
};
