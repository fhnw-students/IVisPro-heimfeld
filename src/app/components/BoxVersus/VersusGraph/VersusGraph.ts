import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Chart from 'chart.js';

import { Player } from '@/app/models/Player';
import { TennisGetters } from '@/app/store/tennis';

@Component
export default class VersusGraph extends Vue {

  @Prop()
  public playerValue: number;

  @Prop()
  public opponentValue: number;

  public chart: Chart;

  @Watch('playerValue')
  public playerChanged(): void {
    this.update();
  }

  @Watch('opponentValue')
  public opponentChanged(): void {
    this.update();
  }

  public update(): void {
    this.chart.data.datasets = [{
      data: [
        this.opponentValue,
        this.playerValue,
      ],
      backgroundColor: [
        '#3E325C',
        '#B35168',
      ],
    }] as any;
    this.chart.update();
  }

  public mounted(): void {
    this.chart = new Chart((this.$refs.chart as any).getContext('2d'), {
      type: 'doughnut',
      options: {
        animation: {
          duration: 2000,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
    this.update();
  }

}
