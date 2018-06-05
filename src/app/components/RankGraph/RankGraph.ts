import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import Chart from 'chart.js';

import { TennisGetters } from '@/app/store/tennis';
import { Match } from '@/app/models/Match';
import { Player } from '@/app/models/Player';

@Component
export default class RankGraph extends Vue {

  @Getter(TennisGetters.Player)
  public player: Player;

  @Getter(TennisGetters.Opponent)
  public opponent: Player;

  @Getter(TennisGetters.Matches)
  public matches: Match[];

  @Getter(TennisGetters.HasMatches)
  public hasMatches: boolean;

  @Getter(TennisGetters.IsFiltering)
  public isFiltering: boolean;

  @Watch('player')
  public playerChanged(): void {
    this.update();
  }

  @Watch('opponent')
  public opponentChanged(): void {
    this.update();
  }

  public chart: Chart;

  private log = this.$createLogger('RankGraph');

  public mounted(): void {
    this.chart = new Chart((this.$refs.graph as any).getContext('2d'), {
      type: 'line',
      options: {
        elements: {
          point: {
            hoverRadius: 0,
            hitRadius: 0,
          },
        },
        responsive: true,
        layout: {
          padding: 0,

        },
        animation: {
          duration: 2000,
        },
        // hover: { mode: undefined },
        // tooltips: { enabled: false },
        scales: {
          xAxes: [{
            scaleLabel: {
              labelString: 'Matches',
            },
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Rankes',
            },
            ticks: {
              // min: 1,
              // max: 1,
              reverse: true,
              beginAtZero: false,
              callback: (label, index, labels) => {
                if (Math.floor(label) === label) {
                  return label;
                }
              },
            },
          }],
        },
      },
      data: {
        labels: [],
        datasets: [
          {
            label: 'Player',
            backgroundColor: '#B35168',
            borderColor: '#B35168',
            borderWidth: 3,
            pointRadius: 0,
            fill: false,
            data: [],
          },
          {
            label: 'Opponent',
            backgroundColor: '#695379',
            borderColor: '#695379',
            borderWidth: 3,
            pointRadius: 0,
            fill: false,
            data: [],
          },
        ],
      },
    });
    this.update();
  }

  public update(): void {
    this.chart.data.labels = this.matches.map((match) => `${match.name} ${match.date.format('YYYY')}`).reverse();

    if (this.chart.data.datasets) {
      this.chart.data.datasets[0].label = this.player.fullname;
      this.chart.data.datasets[0].data = this.matches.map((match) =>
        (match.winner.id === this.player.id) ? parseInt(match.winner.rank, 10) : parseInt(match.loser.rank, 10)).reverse();

      this.chart.data.datasets[1].label = this.opponent.fullname;
      this.chart.data.datasets[1].data = this.matches.map((match) =>
        (match.winner.id === this.opponent.id) ? parseInt(match.winner.rank, 10) : parseInt(match.loser.rank, 10)).reverse();
    }

    this.chart.update();
  }

}
