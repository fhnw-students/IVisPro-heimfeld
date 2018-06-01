import { Exclude, Expose, Transform } from 'class-transformer';
import moment from 'moment';

import { nations } from './nations';
import { Ranking } from '@/app/models/Ranking';

@Exclude()
export class Player {

  @Expose() public id: string;
  @Expose() public lastname: string;
  @Expose() public firstname: string;
  @Expose() public hand: string;
  @Expose() public nation: string;

  @Transform((value: string) => moment(new Date(parseInt(value, 10))), { toClassOnly: true })
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
