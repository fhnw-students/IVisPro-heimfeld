import { Transform, Type, Exclude, Expose, plainToClass } from 'class-transformer';
import * as moment from 'moment';

import { tournamentLevel } from '@/app/constants/tournament-levels';
import { dateTransformer, dateStringTransformer } from './transformers/date.transformer';
import { MatchPlayer } from '@/app/models/MatchPlayer';
import { rounds } from '@/app/constants/rounds';
import { gamesAmountTransformer, setsAmountTransformer } from './transformers/score.transformer';

export interface MatchJson {
  tourney_id: string;
  tourney_name: string;
  surface: string;
  draw_size: string;
  tourney_level: string;
  tourney_date: string;
  match_num: string;
  score: string;
  best_of: string;
  round: string;
  winner_id: string;
  winner_rank: string;
  loser_id: string;
  loser_rank: string;

  winner_sets: number;
  winner_games: number;
  loser_sets: number;
  loser_games: number;
}

export class Match {

  @Transform((value, obj, type) => `${obj.tourney_id}_${obj.match_num}`, { toClassOnly: true })
  public id: number;

  @Expose({ name: 'tourney_name' }) public name: string;
  @Expose({ name: 'draw_size' }) public drawSize: string;
  @Expose({ name: 'tourney_level' }) public tourneyLevel: string;
  @Expose({ name: 'best_of' }) public bestOf: string;
  public score: string;
  public surface: string;
  public round: string;

  @Expose({ name: 'tourney_date' })
  @Transform(dateTransformer, { toClassOnly: true })
  @Transform(dateStringTransformer, { toPlainOnly: true })
  public date: moment.Moment;

  @Expose()
  @Transform((value, obj, type) => ({
    id: obj.winner_id,
    rank: obj.winner_rank,
    amountSets: setsAmountTransformer(obj.score),
    amountGames: gamesAmountTransformer(obj.score),
  }), { toClassOnly: true })
  @Type(() => MatchPlayer)
  public winner: MatchPlayer;

  @Expose()
  @Transform((value, obj, type) => ({
    id: obj.loser_id,
    rank: obj.loser_rank,
    amountSets: setsAmountTransformer(obj.score, 1),
    amountGames: gamesAmountTransformer(obj.score, 1),
  }), { toClassOnly: true })
  @Type(() => MatchPlayer)
  public loser: MatchPlayer;

  public filterSurface(surfaces: string): boolean {
    return surfaces === 'Overall' || this.surface === surfaces;
  }

  public filterTournament(tournament: string): boolean {
    return tournament === 'Overall' || tournamentLevel[this.tourneyLevel] === tournament;
  }

  public filterYear(year: string): boolean {
    return year === 'Overall' || this.date.format('YYYY') === year;
  }

  public get roundAsText(): string {
    return `${(rounds as any)[this.round]}`;
  }

}
