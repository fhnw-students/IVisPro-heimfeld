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

  private log = this.$createLogger('VersusGraph');

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
      data: this.buildData(opponentValue, playerValue),
      backgroundColor: ['#3E325C', '#B35168'],
    };
  }

  public buildData(opponentValue: number, playerValue: number): any {
    return [
      this.checkForZeros(opponentValue, playerValue),
      this.checkForZeros(playerValue, opponentValue),
    ];
  }

  public checkForZeros(valueA: number, valueB: number): number {
    if (valueA === 0 && valueB === 0) {
      return 1;
    }
    return valueA;
  }

  public update(): void {
    this.log.info('update', this.selected, this.chart.data.datasets);
    if (!this.chart.data.datasets) {
      this.chart.data.datasets = [];
    }

    switch (this.selected) {

      case 'Wins':
        this.chart.data.datasets.splice(1, 2);
        this.chart.data.datasets.map((dataset) => {
          if (dataset.data) {
            dataset.data[0] = this.checkForZeros(this.opponentWins, this.playerWins);
            dataset.data[1] = this.checkForZeros(this.playerWins, this.opponentWins);
          }
          return dataset;
        });
        break;

      case 'Sets':
        this.chart.data.datasets.splice(1, 2);
        this.chart.data.datasets.map((dataset) => {
          if (dataset.data) {
            dataset.data[0] = this.checkForZeros(this.opponentSets, this.playerSets);
            dataset.data[1] = this.checkForZeros(this.playerSets, this.opponentSets);
          }
          return dataset;
        });
        break;

      case 'Games':
        this.chart.data.datasets.splice(1, 2);
        this.chart.data.datasets.map((dataset) => {
          if (dataset.data) {
            dataset.data[0] = this.checkForZeros(this.opponentGames, this.playerGames);
            dataset.data[1] = this.checkForZeros(this.playerGames, this.opponentGames);
          }
          return dataset;
        });
        break;

      default:
        if (this.chart.data.datasets.length === 1) {
          this.chart.data.datasets.map((dataset) => {
            if (dataset.data) {
              dataset.data[0] = this.checkForZeros(this.opponentWins, this.playerWins);
              dataset.data[1] = this.checkForZeros(this.playerWins, this.opponentWins);
            }
            return dataset;
          });
          this.chart.data.datasets.push(this.buildDataset(this.opponentSets, this.playerSets));
          this.chart.data.datasets.push(this.buildDataset(this.opponentGames, this.playerGames));
        } else if (this.chart.data.datasets.length === 3) {
          this.chart.data.datasets.map((dataset, index) => {
            if (dataset.data) {
              if (index === 0) {
                dataset.data[0] = this.checkForZeros(this.opponentWins, this.playerWins);
                dataset.data[1] = this.checkForZeros(this.playerWins, this.opponentWins);
              }
              if (index === 1) {
                dataset.data[0] = this.checkForZeros(this.opponentSets, this.playerSets);
                dataset.data[1] = this.checkForZeros(this.playerSets, this.opponentSets);
              }
              if (index === 2) {
                dataset.data[0] = this.checkForZeros(this.opponentGames, this.playerGames);
                dataset.data[1] = this.checkForZeros(this.playerGames, this.opponentGames);
              }
            }
            return dataset;
          });
        } else {
          this.chart.data.datasets = [];
          this.chart.data.datasets.push(this.buildDataset(this.opponentWins, this.playerWins));
          this.chart.data.datasets.push(this.buildDataset(this.opponentSets, this.playerSets));
          this.chart.data.datasets.push(this.buildDataset(this.opponentGames, this.playerGames));
        }
        break;

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
        tooltips: { enabled: false },
      },
    });
    this.chart.data.datasets = [];
    this.chart.data.datasets.push(this.buildDataset(this.opponentWins, this.playerWins));
    this.chart.data.datasets.push(this.buildDataset(this.opponentSets, this.playerSets));
    this.chart.data.datasets.push(this.buildDataset(this.opponentGames, this.playerGames));
    this.log.info('init', this.selected, this.chart.data.datasets);
    this.update();
  }

}
