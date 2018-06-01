import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class MatchPlayer {

  @Expose() public id: string;
  @Expose() public name: string;
  @Expose() public ht: string;
  @Expose() public ioc: string;
  @Expose() public age: string;
  @Expose() public rank: string;
  @Expose() public rankPoints: string;

}
