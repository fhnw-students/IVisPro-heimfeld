import { Expose, Exclude, Transform } from 'class-transformer';
import moment from 'moment';

import { dateTransformer } from './transformers/date.transformer';

@Exclude()
export class Ranking {

  @Expose() public id: string;
  @Expose() public rank: string;
  @Expose() public points: string;

  @Transform(dateTransformer, { toClassOnly: true })
  @Expose() public date: string;

}
