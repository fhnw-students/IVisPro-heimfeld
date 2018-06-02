import { Getter } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { TennisGetters } from '@/app/store/tennis';
import { Match } from '@/app/models/Match';
import { Player } from '@/app/models/Player';
import { rounds } from '@/app/constants/rounds';

@Component
export default class TimelineEvent extends Vue {

  @Prop()
  public match: Match;

  @Getter(TennisGetters.Player)
  public player: Player;

  @Getter(TennisGetters.Opponent)
  public opponent: Player;

  get isLeft(): boolean {
    return this.match.winner.id === this.player.id;
  }

  get surfaceCssClass(): string {
    return `timeline__image--${this.match.surface.toLowerCase()}`;
  }

  get tournamentLevelCssClass(): string {
    if (this.match.tourneyLevel === 'G') { return 'trophy'; }
    if (this.match.tourneyLevel === 'D')  { return 'flag'; }
    if (this.match.tourneyLevel === 'M') { return 'star'; }
    if (this.match.tourneyLevel === 'A' && this.match.drawSize === '8') { return 'gem'; } else { return 'star-half'; }
  }

}
