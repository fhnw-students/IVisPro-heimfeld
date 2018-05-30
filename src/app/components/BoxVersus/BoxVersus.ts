import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import VersusGraph from '@/app/components/BoxVersus/VersusGraph/VersusGraph';
import { Player } from '@/app/models/Player';
import { TennisGetters } from '@/app/store/tennis';

@Component({
  components: {
    VersusGraph,
  },
})
export default class BoxVersus extends Vue {

  @Getter(TennisGetters.Player)
  public player: Player;

  @Getter(TennisGetters.Opponent)
  public opponent: Player;

}
