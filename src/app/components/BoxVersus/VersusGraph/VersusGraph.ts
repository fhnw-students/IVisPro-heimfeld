import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Chart from 'chart.js';

import { Player } from '@/app/models/Player';
import { TennisGetters } from '@/app/store/tennis';

@Component
export default class VersusGraph extends Vue {

  @Prop() public playerWins: number;
  @Prop() public playerSets: number;
  @Prop() public playerGames: number;
  @Prop() public opponentWins: number;
  @Prop() public opponentSets: number;
  @Prop() public opponentGames: number;

  public chart: Chart;

  public selected = 'Overall';

  public list: string[] = [
    'Overall',
    'Wins',
    'Sets',
    'Games',
  ];

  @Watch('playerWins')
  public playerWinsChanged(): void {
    this.update();
  }

  @Watch('opponentWins')
  public opponentWinsChanged(): void {
    this.update();
  }

  @Watch('playerSets')
  public playerSetsChanged(): void {
    this.update();
  }

  @Watch('opponentSets')
  public opponentSetsChanged(): void {
    this.update();
  }

  @Watch('playerGames')
  public playerGamesChanged(): void {
    this.update();
  }

  @Watch('opponentGames')
  public opponentGamesChanged(): void {
    this.update();
  }

  public onSelection(item: string): void {
    this.selected = item;
    this.update();
  }

  public buildDataset(opponentValue: number, playerValue: number): any {
    return {
      data: [opponentValue, playerValue],
      backgroundColor: ['#3E325C', '#B35168'],
    };
  }

  public update(): void {
    this.chart.data.datasets = [];

    if (this.selected === 'Overall' || this.selected === 'Wins') {
      if (this.opponentWins === 0 && this.playerWins === 0) {
        this.opponentWins = this.playerWins = 1;
      }
      this.chart.data.datasets.push(this.buildDataset(this.opponentWins, this.playerWins));
    }

    if (this.selected === 'Overall' || this.selected === 'Sets') {
      if (this.opponentSets === 0 && this.playerSets === 0) {
        this.opponentSets = this.playerSets = 1;
      }
      this.chart.data.datasets.push(this.buildDataset(this.opponentSets, this.playerSets));
    }

    if (this.selected === 'Overall' || this.selected === 'Games') {
      if (this.opponentGames === 0 && this.playerGames === 0) {
        this.opponentGames = this.playerGames = 1;
      }
      this.chart.data.datasets.push(this.buildDataset(this.opponentGames, this.playerGames));
    }

    this.chart.update();
  }

  public mounted(): void {
    this.chart = new Chart((this.$refs.chart as any).getContext('2d'), {
      type: 'doughnut',
      options: {
        responsive: true,
        cutoutPercentage: 65,
        layout: {
          padding: 0,
        },
        animation: {
          duration: 2000,
        },
        hover: { mode: undefined },
        tooltips: {
          enabled: false,
        },
      },
    });
    this.update();
  }

}
