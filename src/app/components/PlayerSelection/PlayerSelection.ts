import { Component, Prop, Vue } from 'vue-property-decorator';
import { plainToClass } from 'class-transformer';
import { Action, Getter } from 'vuex-class';

import PlayerDropdown from './PlayerDropdown/PlayerDropdown';
import { TennisGetters, TennisActions, Head2Head } from '@/app/store/tennis';
import { Player } from '@/app/models/Player';

@Component({
  components: {
    PlayerDropdown,
  },
})
export default class PlayerSelection extends Vue {

  @Getter(TennisGetters.Player)
  public player: Player;

  @Getter(TennisGetters.Opponent)
  public opponent: Player;

  @Getter(TennisGetters.Players)
  public players: Player[];

  @Action(TennisActions.LoadHead2HeadStat)
  public loadHead2Head: (head2Head: Head2Head) => void;

  private log = Vue.$createLogger('PlayerSelection');

  public onPlayerSelected(player: Player): void {
    this.log.info('onPlayerSelected', player.fullname);
    this.loadHead2Head({
      player,
      opponent: this.opponent,
    });
  }

  public onOpponentSelected(opponent: Player): void {
    this.log.info('onOpponentSelected', opponent.fullname);
    this.loadHead2Head({
      player: this.player,
      opponent,
    });
  }

}
