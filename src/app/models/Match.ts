import { Transform, Type } from 'class-transformer';
import * as moment from 'moment';
import { Moment } from 'moment';

import { MatchPlayer } from '@/app/models/MatchPlayer';

export class Match {

  public id: number;
  public tournamentEventId: number;
  public tournament: string;
  public level: string;
  public surface: string;
  public round: string;
  public bestOf: number;
  public indoor: boolean;
  public score: string;
  public hasStats: true;

  @Type(() => Date)
  @Transform((value: Date) => moment(value), { toClassOnly: true })
  public date: Moment;

  @Type(() => MatchPlayer)
  public winner: MatchPlayer;

  @Type(() => MatchPlayer)
  public loser: MatchPlayer;

}
