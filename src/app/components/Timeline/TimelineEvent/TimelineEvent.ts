import { Getter } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { TennisGetters } from '@/app/store/tennis';
import { Match } from '@/app/models/Match';
import { Player } from '@/app/models/Player';

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
    if (this.match.tourneyLevel === 'G') { return 'fas fa-trophy'; }
    if (this.match.tourneyLevel === 'M') { return 'fas fa-star'; }
    if (this.match.tourneyLevel === 'D')  { return 'fas fa-flag'; }
    if (this.match.tourneyLevel === 'A' && this.match.drawSize === '8') { return 'fas fa-gem'; } else { return 'fas fa-star-half'; }
  }

}
