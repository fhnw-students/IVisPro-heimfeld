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

}
