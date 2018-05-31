import { Component, Prop, Vue } from 'vue-property-decorator';

import PlayerSelection from '@/app/components/PlayerSelection/PlayerSelection';
import BoxVersus from '@/app/components/BoxVersus/BoxVersus';
import FilterRow from '@/app/components/FilterRow/FilterRow';
import Timeline from '@/app/components/Timeline/Timeline';
import Authors from '@/app/components/Authors/Authors';
import Footer from '@/app/components/Footer/Footer';

@Component({
  components: {
    PlayerSelection,
    BoxVersus,
    FilterRow,
    Timeline,
    Authors,
    Footer,
  },
})
export default class Main extends Vue {

  public created(): void {
    //
  }

}
