import { Expose, Exclude, Transform } from 'class-transformer';
import moment from 'moment';

@Exclude()
export class Ranking {

  @Expose() public id: string;
  @Expose() public rank: string;
  @Expose() public points: string;

  @Transform((value: string) => moment(new Date(parseInt(value, 10))), { toClassOnly: true })
  @Expose() public date: string;

}
