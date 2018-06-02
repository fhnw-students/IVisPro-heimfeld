
import { Transform, Type, Exclude, Expose } from 'class-transformer';
import * as moment from 'moment';

import { dateTransformer } from './transformers/date.transformer';
import { MatchPlayer } from '@/app/models/MatchPlayer';
import { rounds } from '@/app/constants/rounds';

@Exclude()
export class Match {

  @Transform((value, obj, type) => `${obj.tourney_id}_${obj.match_num}`)
  @Expose() public id: number;

  @Expose() public surface: string;

  @Expose({ name: 'tourney_name' }) public name: string;
  @Expose({ name: 'draw_size' }) public drawSize: string;
  @Expose({ name: 'tourney_level' }) public tourneyLevel: string;
  @Expose() public score: string;
  @Expose() public best_of: string;
  @Expose() public round: string;
  @Expose() public minutes: string;

  @Expose({ name: 'tourney_date' })
  @Transform(dateTransformer, { toClassOnly: true })
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
  }))
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
  }))
  @Type(() => MatchPlayer)
  public loser: MatchPlayer;

  public get roundAsText(): string {
    return `${(rounds as any)[this.round]}`;
  }

}
