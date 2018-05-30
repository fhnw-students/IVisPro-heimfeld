import { Expose, Transform } from 'class-transformer';

export class MatchPlayer {

  public id: number;
  public seed: number;
  public rank: number;
  public eloRank: number;
  public eloRatingDelta: number;
  public name: string;

}
