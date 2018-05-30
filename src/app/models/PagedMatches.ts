import { Type } from 'class-transformer';

import { Match } from './Match';

export class PagedMatches {

  public current: number;
  public rowCount: number;
  public total: number;

  @Type(() => Match)
  public rows: Match[];

}
