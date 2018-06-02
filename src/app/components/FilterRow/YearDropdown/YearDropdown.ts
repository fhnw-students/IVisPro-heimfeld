import { TennisActions } from './../../../store/tennis/index';
import { Getter, Action } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { surfaces } from '@/app/constants/surfaces';
import { TennisGetters, TennisState } from '@/app/store/tennis';
import { Player } from '@/app/models/Player';

interface FilterOptions {
  year: string;
}

@Component
export default class YearDropdown extends Vue {

  @Getter(TennisGetters.Filters)
  public filters: FilterOptions;

  @Getter(TennisGetters.GetYears)
  public years: string[];

  @Action(TennisActions.SetFilterYear)
  public setFilterYear: (value: string) => void;

  public onSelection(value: string): void {
    this.setFilterYear(value);
  }

  public get list(): string[] {
    return [
      'Overall',
      ...this.years,
    ];
  }

}
