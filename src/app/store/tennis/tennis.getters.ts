import { Contributor } from '@/app/models/Contributor';
import { TennisState } from './tennis.state';
import { Player } from '@/app/models/Player';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const getterTypes = {
  PLAYER: 'PLAYER',
  OPPONENT: 'OPPONENT',
};

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [getterTypes.PLAYER](state: TennisState): Player {
    return state.player;
  },
  [getterTypes.OPPONENT](state: TennisState): Player {
    return state.opponent;
  },
};
