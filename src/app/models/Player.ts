import { Exclude, Expose, Transform } from 'class-transformer';
import moment from 'moment';

import { dateTransformer } from './transformers/date.transformer';
import { nations } from '@/app/constants/nations';
import { Ranking } from '@/app/models/Ranking';

@Exclude()
export class Player {

  @Expose() public id: string;
  @Expose() public lastname: string;
  @Expose() public firstname: string;
  @Expose() public hand: string;
  @Expose() public nation: string;

  @Transform(dateTransformer, { toClassOnly: true })
  @Expose() public birthday: moment.Moment;

  public ranking: Ranking;
  public wins: number;

  public get flagClass(): string {
    return `flag-icon flag-icon-${(nations as any)[this.nation]}`;
  }

  public get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

}
