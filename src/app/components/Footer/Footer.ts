import { TennisGetters } from '@/app/store/tennis';
import { tennis } from './../../store/tennis/index';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { MetaDataGetters } from '@/app/store/meta';
import { Package } from '@/app/models/Package';

@Component
export default class Footer extends Vue {

  @Getter(MetaDataGetters.Package)
  public package: Package[];

  @Getter(TennisGetters.GetCurrentState)
  public currentState: string;

}
