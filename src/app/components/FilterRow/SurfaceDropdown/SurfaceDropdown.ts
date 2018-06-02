import { TennisActions } from './../../../store/tennis/index';
import { Getter, Action } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { surfaces } from '@/app/constants/surfaces';
import { TennisGetters, TennisState } from '@/app/store/tennis';
import { Player } from '@/app/models/Player';

interface FilterOptions {
  surface: string;
}

@Component
export default class SurfaceDropdown extends Vue {

  @Getter(TennisGetters.Filters)
  public filters: FilterOptions;

  @Action(TennisActions.SetFilterSurface)
  public setFilterSurface: (value: string) => void;

  public surfaces: string[] = surfaces;

  public onSelection(value: string): void {
    this.setFilterSurface(value);
  }

}
