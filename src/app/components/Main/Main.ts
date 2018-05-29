import { Component, Prop, Vue } from 'vue-property-decorator';

import PlayerSelection from '@/app/components/PlayerSelection/PlayerSelection';
import BoxVersus from '@/app/components/BoxVersus/BoxVersus';
import FilterRow from '@/app/components/FilterRow/FilterRow';
import Timeline from '@/app/components/Timeline/Timeline';

@Component({
  components: {
    PlayerSelection,
    BoxVersus,
    FilterRow,
    Timeline,
  },
})
export default class Main extends Vue {

  public created(): void {
    //
  }

}
