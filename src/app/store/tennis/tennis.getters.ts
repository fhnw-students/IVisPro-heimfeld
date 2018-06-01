import { TennisState } from './tennis.state';
import { Player } from '@/app/models/Player';
import { Match } from '@/app/models/Match';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const getterTypes = {
  IS_INITIALIZED: 'IS_INITIALIZED',
  PLAYER: 'PLAYER',
  PLAYERS: 'PLAYERS',
  OPPONENT: 'OPPONENT',
  MATCHES: 'MATCHES',
};

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [getterTypes.PLAYER](state: TennisState): Player {
    return state.player;
  },
  [getterTypes.PLAYERS](state: TennisState): Player[] {
    return state.players;
  },
  [getterTypes.OPPONENT](state: TennisState): Player {
    return state.opponent;
  },
  [getterTypes.IS_INITIALIZED](state: TennisState): boolean {
    return state.isInitialized;
  },
  [getterTypes.MATCHES](state: TennisState): Match[] {
    return state.filteredMatches;
  },
};
