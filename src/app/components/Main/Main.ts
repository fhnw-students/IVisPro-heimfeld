import { Component, Prop, Vue } from 'vue-property-decorator';

import PlayerSelection from '@/app/components/PlayerSelection/PlayerSelection';
import BoxVersus from '@/app/components/BoxVersus/BoxVersus';
import FilterRow from '@/app/components/FilterRow/FilterRow';
import Timeline from '@/app/components/Timeline/Timeline';
import Authors from '@/app/components/Authors/Authors';
import Footer from '@/app/components/Footer/Footer';
import Spinner from '@/app/components/Spinner/Spinner.vue';
import Head from '@/app/components/Head/Head';
import { Getter } from 'vuex-class';
import { GithubGetters } from '@/app/store/github';
import { TennisGetters } from '@/app/store/tennis';

@Component({
  components: {
    PlayerSelection,
    BoxVersus,
    FilterRow,
    Timeline,
    Authors,
    Footer,
    Spinner,
    Head,
  },
})
export default class Main extends Vue {

  @Getter(GithubGetters.IsInitialized)
  public isGithubReady: boolean;

  @Getter(TennisGetters.IsInitialized)
  public isTennisReady: boolean;

  public isDelayDone = false;

  public mounted(): void {
    setTimeout(() => this.isDelayDone = true, 100);
  }

  public get isReady(): boolean {
    return this.isDelayDone && this.isGithubReady && this.isTennisReady;
  }

}
