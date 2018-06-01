import { TennisGetters } from '@/app/store/tennis';
import { Getter } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Player } from '@/app/models/Player';

@Component
export default class PlayerDropdown extends Vue {

  @Prop()
  public label: string;

  @Prop()
  public theme: string;

  @Prop()
  public players: Player[];

  @Getter(TennisGetters.Player)
  public player: Player;

  @Getter(TennisGetters.Opponent)
  public opponent: Player;

  public get filteredPlayers(): Player[] {
    return this.players.filter((player) => player.id !== this.player.id && player.id !== this.opponent.id);
  }

  public onSelection(player: Player): void {
    this.$emit('select', player);
  }

}
