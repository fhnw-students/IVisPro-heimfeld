import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class Package {

  @Expose()
  public name: string;

  @Expose()
  public title: string;

  @Expose()
  public version: string;

  @Expose()
  public description: string;

}
