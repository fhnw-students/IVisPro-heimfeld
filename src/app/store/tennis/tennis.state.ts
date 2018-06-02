import { surfaces } from '@/app/constants/surfaces';
import { Match } from '@/app/models/Match';
import { Player } from '@/app/models/Player';
import { Ranking } from '@/app/models/Ranking';

export interface FilterOptions {
  surface: string;
  tournament: string;
  year: string;
}

export interface TennisState {
  players: Player[];
  matches: Match[];
  rankings: Ranking[];

  player: Player;
  opponent: Player;
  playedMatches: Match[];
  filteredMatches: Match[];
  filters: FilterOptions;

  isFetching: boolean;
  isInitialized: boolean;
  error: any;
}

export const initialState: TennisState = {
  players: [],
  matches: [],
  rankings: [],

  player: new Player(),
  opponent: new Player(),
  playedMatches: [],
  filteredMatches: [],
  filters: {
    surface: 'Overall',
    year: 'Overall',
    tournament: 'Overall',
  },

  isFetching: false,
  isInitialized: false,
  error: undefined,
};
