import { Expose, Transform } from 'class-transformer';

export class Player {

  @Transform((value: string) => parseInt(value, 10), { toClassOnly: true })
  public id: number;

  public key: string;

  @Expose({ name: 'value' })
  public name: string;

  // @Expose({ name: 'label' })
  // @Transform((label: string) => label.substr(label.length - 4).substr(0, 3), { toClassOnly: true })
  public nation: string;

  public rank: number;
  public wins: number;

  public get flagClass(): string {
    return `flag-icon flag-icon-${this.nation}`;
  }

}
