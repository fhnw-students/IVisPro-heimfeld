import { Getter } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { TennisGetters } from '@/app/store/tennis';
import { Match } from '@/app/models/Match';
import TimelineEvent from './TimelineEvent/TimelineEvent';

@Component({
  components: {
    TimelineEvent,
  },
})
export default class Timeline extends Vue {

  @Getter(TennisGetters.Matches)
  public matches: Match[];

  @Getter(TennisGetters.HasMatches)
  public hasMatches: boolean;

  @Getter(TennisGetters.IsFiltering)
  public isFiltering: boolean;

  public amountMatchesToShow = 5;

  public onShowNext(): void {
    this.amountMatchesToShow = this.amountMatchesToShow + 1;
  }

  public get hasPreviousMatch(): boolean {
    return this.matches.length > this.amountMatchesToShow;
  }

}
