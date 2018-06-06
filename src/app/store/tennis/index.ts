import { SET_FILTER_SURFACE, SET_FILTER_YEAR, SET_FILTER_TOURNAMENT } from './tennis.mutations.types';
import { Player } from '@/app/models/Player';
import { actions, actionTypes } from './tennis.actions';
import { getters, getterTypes } from './tennis.getters';
import { mutations } from './tennis.mutations';
import { initialState } from './tennis.state';

// -------------------------------------------------------------------------
// Export Types & Interfaces
// -------------------------------------------------------------------------

export * from './tennis.state';
export { Head2Head } from './tennis.actions';

// -------------------------------------------------------------------------
// Define Namespace, Actions & Getters
// -------------------------------------------------------------------------

export const TennisNamespace = 'tennis';

export const TennisActions = {
  LoadHead2HeadStat: `${TennisNamespace}/${actionTypes.LOAD_HEAD_2_HEAD_STATS}`,
  Init: `${TennisNamespace}/${actionTypes.INIT}`,
  SetFilterSurface: `${TennisNamespace}/${actionTypes.SET_FILTER_SURFACE}`,
  SetFilterYear: `${TennisNamespace}/${actionTypes.SET_FILTER_YEAR}`,
  SetFilterTournament: `${TennisNamespace}/${actionTypes.SET_FILTER_TOURNAMENT}`,
};

export const TennisGetters = {
  GetCurrentState: `${TennisNamespace}/${getterTypes.GET_CURRENT_STATE}`,
  Filters: `${TennisNamespace}/${getterTypes.FILTERS}`,
  Player: `${TennisNamespace}/${getterTypes.PLAYER}`,
  Players: `${TennisNamespace}/${getterTypes.PLAYERS}`,
  Opponent: `${TennisNamespace}/${getterTypes.OPPONENT}`,
  Matches: `${TennisNamespace}/${getterTypes.MATCHES}`,
  GetYears: `${TennisNamespace}/${getterTypes.GET_YEARS}`,
  IsReady: `${TennisNamespace}/${getterTypes.IS_READY}`,
  IsInitialized: `${TennisNamespace}/${getterTypes.IS_INITIALIZED}`,
  IsFiltering: `${TennisNamespace}/${getterTypes.IS_FILTERING}`,
  IsCalculating: `${TennisNamespace}/${getterTypes.IS_CALCULATING}`,
  HasMatches: `${TennisNamespace}/${getterTypes.HAS_MATCHES}`,
};

// -------------------------------------------------------------------------
// Export Store
// -------------------------------------------------------------------------

export const tennis = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
