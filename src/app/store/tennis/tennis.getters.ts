
import * as _ from 'lodash';
import { TennisState, FilterOptions } from './tennis.state';
import { Player } from '@/app/models/Player';
import { Match, MatchJson } from '@/app/models/Match';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const getterTypes = {
  IS_READY: 'IS_READY',
  IS_INITIALIZED: 'IS_INITIALIZED',
  IS_FILTERING: 'IS_FILTERING',
  IS_CALCULATING: 'IS_CALCULATING',
  FILTERS: 'FILTERS',
  PLAYER: 'PLAYER',
  PLAYERS: 'PLAYERS',
  OPPONENT: 'OPPONENT',
  MATCHES: 'MATCHES',
  GET_YEARS: 'GET_YEARS',
  HAS_MATCHES: 'HAS_MATCHES',
  GET_CURRENT_STATE: 'GET_CURRENT_STATE',
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
  [getterTypes.IS_FILTERING](state: TennisState): boolean {
    return state.isFiltering;
  },
  [getterTypes.IS_CALCULATING](state: TennisState): boolean {
    return state.isCalculating;
  },
  [getterTypes.IS_READY](state: TennisState): boolean {
    return state.isInitialized && !state.isFiltering && !state.isCalculating;
  },
  [getterTypes.MATCHES](state: TennisState): Match[] {
    return state.filteredMatches;
  },
  [getterTypes.GET_YEARS](state: TennisState): string[] {
    return _.uniq(state.matches.map((match: MatchJson) => match.tourney_date.substring(0, 4)));
  },
  [getterTypes.HAS_MATCHES](state: TennisState): boolean {
    return state.filteredMatches.length > 0;
  },
  [getterTypes.GET_CURRENT_STATE](state: TennisState): string {
    const year = state.matches[0].tourney_date.substring(0, 4);
    const month = state.matches[0].tourney_date.substring(5, 6);
    const day = state.matches[0].tourney_date.substring(7, 8);
    return day + '-' + month + '-' + year;
  },
};
