import { TennisActions } from './../../../store/tennis/index';
import { Getter, Action } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { tournamentLevel } from '@/app/constants/tournament-levels';
import { TennisGetters, TennisState } from '@/app/store/tennis';
import { Player } from '@/app/models/Player';
import TournamentIcon from './TournamentIcon/TournamentIcon';

interface FilterOptions {
  tournament: string;
}

@Component({
  components: {
    TournamentIcon,
  },
})
export default class TournamentDropdown extends Vue {

  @Getter(TennisGetters.Filters)
  public filters: FilterOptions;

  @Action(TennisActions.SetFilterTournament)
  public setFilterTournament: (value: string) => void;

  public tournaments: string[] = [];

  public onSelection(value: string): void {
    this.setFilterTournament(value);
  }

  public created(): void {
    this.tournaments = [
      'Overall',
      ...Object.values(tournamentLevel),
    ];
  }

}
