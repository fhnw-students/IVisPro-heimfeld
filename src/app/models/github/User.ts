import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class User {

  @Expose()
  public id: number;

  @Expose()
  public login: string;

  @Expose()
  public avatar_url: string;

  @Expose()
  public name: string;

  @Expose()
  public company: string;

  @Expose()
  public blog: string;

  @Expose()
  public location: string;

  @Expose()
  public bio: string;

  @Expose()
  public html_url: string;

}
