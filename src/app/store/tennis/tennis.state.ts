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

  isInitialized: boolean;
  isFiltering: boolean;
  isCalculating: boolean;
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

  isInitialized: false,
  isFiltering: false,
  isCalculating: false,
};
