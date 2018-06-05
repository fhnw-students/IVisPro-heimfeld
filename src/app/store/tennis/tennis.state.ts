import { surfaces } from '@/app/constants/surfaces';
import { Match, MatchJson } from '@/app/models/Match';
import { Player } from '@/app/models/Player';
import { Ranking } from '@/app/models/Ranking';

export interface FilterOptions {
  surface: string;
  tournament: string;
  year: string;
}

export interface TennisState {
  players: Player[];
  rankings: Ranking[];

  matches: MatchJson[];
  playedMatches: Match[];

  player: Player;
  opponent: Player;
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
