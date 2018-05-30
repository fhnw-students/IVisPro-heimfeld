import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Chart from 'chart.js';

import { Player } from '@/app/models/Player';
import { TennisGetters } from '@/app/store/tennis';

@Component
export default class BoxVersus extends Vue {

  @Getter(TennisGetters.Player)
  public player: Player;

  @Getter(TennisGetters.Opponent)
  public opponent: Player;

  public mounted(): void {
    // console.log('adf', this.$refs['chart']);

    const myChart = new Chart((this.$refs.chart as any).getContext('2d'), {
      type: 'doughnut',
      options: {
        animation: {
          duration: 2000,
        },
        tooltips: {
          enabled: false,
        },
      },
      data: {
        datasets: [{
          label: '# of Votes',
          data: [
            this.opponent.wins,
            this.player.wins,
          ],
          backgroundColor: [
            '#3E325C',
            '#B35168',
          ],
        }],
      },
    });
  }

}
