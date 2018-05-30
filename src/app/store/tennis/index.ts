import { Player } from '@/app/models/Player';
import { actions, actionTypes } from './tennis.actions';
import { getters, getterTypes } from './tennis.getters';
import { mutations } from './tennis.mutations';
import { initialState } from './tennis.state';

// -------------------------------------------------------------------------
// Export Types & Interfaces
// -------------------------------------------------------------------------

export * from './tennis.state';

// -------------------------------------------------------------------------
// Define Namespace, Actions & Getters
// -------------------------------------------------------------------------

export const TennisNamespace = 'tennis';

export const TennisActions = {
  LoadHead2HeadStat: `${TennisNamespace}/${actionTypes.LOAD_HEAD_2_HEAD_STATS}`,
};

export const TennisGetters = {
  Player: `${TennisNamespace}/${getterTypes.PLAYER}`,
  Opponent: `${TennisNamespace}/${getterTypes.OPPONENT}`,
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
