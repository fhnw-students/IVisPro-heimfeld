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

}
