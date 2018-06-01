import { Match } from '@/app/models/Match';
import { Player } from '@/app/models/Player';
import { Ranking } from '@/app/models/Ranking';

export interface TennisState {
  players: Player[];
  matches: Match[];
  rankings: Ranking[];

  player: Player;
  opponent: Player;
  rawMatches: Match[];
  playedMatches: Match[];
  filteredMatches: Match[];

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
  rawMatches: [],
  playedMatches: [],
  filteredMatches: [],

  isFetching: false,
  isInitialized: false,
  error: undefined,
};
