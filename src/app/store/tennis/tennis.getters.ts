import * as _ from 'lodash';
import { TennisState, FilterOptions } from './tennis.state';
import { Player } from '@/app/models/Player';
import { Match } from '@/app/models/Match';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const getterTypes = {
  IS_INITIALIZED: 'IS_INITIALIZED',
  FILTERS: 'FILTERS',
  PLAYER: 'PLAYER',
  PLAYERS: 'PLAYERS',
  OPPONENT: 'OPPONENT',
  MATCHES: 'MATCHES',
  GET_YEARS: 'GET_YEARS',
};

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [getterTypes.FILTERS](state: TennisState): FilterOptions {
    return state.filters;
  },
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
  [getterTypes.GET_YEARS](state: TennisState): string[] {
    return _.uniq(state.matches.map((match: Match) => match.date.format('YYYY'))).reverse();
  },
};
