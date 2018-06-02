import { Component, Prop, Vue } from 'vue-property-decorator';

import SurfaceDropdown from './SurfaceDropdown/SurfaceDropdown';
import TournamentDropdown from './TournamentDropdown/TournamentDropdown';
import YearDropdown from './YearDropdown/YearDropdown';

@Component({
  components: {
    SurfaceDropdown,
    TournamentDropdown,
    YearDropdown,
  },
})
export default class FilterRow extends Vue { }
