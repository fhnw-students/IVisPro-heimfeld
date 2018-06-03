import { Exclude, Expose, Transform } from 'class-transformer';
import moment from 'moment';

import { dateTransformer } from './transformers/date.transformer';
import { nations } from '@/app/constants/nations';
import { Ranking } from '@/app/models/Ranking';

@Exclude()
export class Player {

  @Expose() public id: string;
  @Expose({ name: 'firstname' }) public lastname: string;
  @Expose({ name: 'lastname' }) public firstname: string;
  @Expose() public hand: string;
  @Expose() public nation: string;

  @Transform(dateTransformer, { toClassOnly: true })
  @Expose() public birthday: moment.Moment;

  public ranking: Ranking;
  public wins: number = 0;
  public sets: number = 0;
  public games: number = 0;

  public get flagClass(): string {
    return `flag-icon flag-icon-${(nations as any)[this.nation]}`;
  }

  public get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  public getWinsInPercentage(opponentValue: number): number {
    if (this.wins === 0 && opponentValue === 0) {
      return 0;
    }
    const percentage = (100 * this.wins / (this.wins + opponentValue));
    return Math.round(percentage);
  }

  public getSetsInPercentage(opponentValue: number): number {
    if (this.sets === 0 && opponentValue === 0) {
      return 0;
    }
    const percentage = (100 * this.sets / (this.sets + opponentValue));
    return Math.round(percentage);
  }

  public getGamesInPercentage(opponentValue: number): number {
    if (this.games === 0 && opponentValue === 0) {
      return 0;
    }
    const percentage = (100 * this.games / (this.games + opponentValue));
    return Math.round(percentage);
  }

}
