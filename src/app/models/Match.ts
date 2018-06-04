import { Transform, Type, Exclude, Expose, plainToClass } from 'class-transformer';
import * as moment from 'moment';

import { tournamentLevel } from '@/app/constants/tournament-levels';
import { dateTransformer, dateStringTransformer } from './transformers/date.transformer';
import { MatchPlayer } from '@/app/models/MatchPlayer';
import { rounds } from '@/app/constants/rounds';
import { gamesAmountTransformer, setsAmountTransformer } from './transformers/score.transformer';

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
  public minutes: string;

  @Expose({ name: 'tourney_date' })
  @Transform(dateTransformer, { toClassOnly: true })
  @Transform(dateStringTransformer, { toPlainOnly: true })
  public date: moment.Moment;

  @Expose()
  @Transform((value, obj, type) => ({
    id: obj.winner_id,
    name: obj.winner_name,
    hand: obj.winner_hand,
    ht: obj.winner_ht,
    ioc: obj.winner_ioc,
    age: obj.winner_age,
    rank: obj.winner_rank,
    rankPoints: obj.winner_rank_points,
    amountSets: setsAmountTransformer(obj.score),
    amountGames: gamesAmountTransformer(obj.score),
  }), { toClassOnly: true })
  @Type(() => MatchPlayer)
  public winner: MatchPlayer;

  @Expose()
  @Transform((value, obj, type) => ({
    id: obj.loser_id,
    name: obj.loser_name,
    hand: obj.loser_hand,
    ht: obj.loser_ht,
    ioc: obj.loser_ioc,
    age: obj.loser_age,
    rank: obj.loser_rank,
    rankPoints: obj.loser_rank_points,
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
