import { Match } from '@/app/models/Match';
import { Player } from '@/app/models/Player';

export interface TennisState {
  player: Player;
  opponent: Player;
  rawMatches: Match[];
  filteredMatches: Match[];
  isFetching: boolean;
  error: any;
}

export const initialState: TennisState = {
  player: new Player(),
  opponent: new Player(),
  rawMatches: [],
  filteredMatches: [],
  isFetching: false,
  error: undefined,
};
