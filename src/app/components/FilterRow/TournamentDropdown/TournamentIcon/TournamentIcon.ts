import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TournamentIcon extends Vue {

  @Prop()
  public tournament: string;

  public get tournamentCssIconClass(): string {
    switch (this.tournament) {
      case 'Grand Slam':
        return 'trophy';
      case 'ATP Masters':
        return 'star';
      case 'ATP':
        return 'star-half';
      case 'Davis Cup':
        return 'flag';
      default:
        return 'circle';
    }
  }

}
