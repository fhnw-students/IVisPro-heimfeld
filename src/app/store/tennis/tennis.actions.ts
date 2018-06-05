import { Ranking } from '@/app/models/Ranking';
import { tournamentLevel } from '@/app/constants/tournament-levels';
import Vue from 'vue';
import * as _ from 'lodash';
import { ActionContext, ActionTree } from 'vuex';

import * as mutationTypes from './tennis.mutations.types';
import { TennisState, FilterOptions } from './tennis.state';
import { Player } from '@/app/models/Player';
import { Match } from '@/app/models/Match';
import { classToPlain, plainToClass } from 'class-transformer';

import matchesJson from '@/data/matches.json';
import playersJson from '@/data/players.json';
import rankingsJson from '@/data/rankings.json';

const log = Vue.$createLogger('tennis-actions');

// const sumReducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

// -------------------------------------------------------------------------
// Define Types & Interfaces
// -------------------------------------------------------------------------
export interface Head2Head {
  player: Player;
  opponent: Player;
}

// -------------------------------------------------------------------------
// Define Action Types
// -------------------------------------------------------------------------

export const actionTypes = {
  LOAD_HEAD_2_HEAD_STATS: 'LOAD_HEAD_2_HEAD_STATS',
  CALCULATE_STATS: 'CALCULATE_STATS',
  FILTER_MATCHES: 'FILTER_MATCHES',
  SET_FILTER_SURFACE: 'SET_FILTER_SURFACE',
  SET_FILTER_TOURNAMENT: 'SET_FILTER_TOURNAMENT',
  SET_FILTER_YEAR: 'SET_FILTER_YEAR',
  INIT: 'INIT',
};

// -------------------------------------------------------------------------
// Define Action Object
// -------------------------------------------------------------------------

export const actions: ActionTree<TennisState, TennisState> = {
  /**
   * Loads all the matches of the given head 2 head.
   */
  async [actionTypes.LOAD_HEAD_2_HEAD_STATS](
    { commit, state, dispatch }: ActionContext<TennisState, TennisState>,
    head2head: Head2Head
  ): Promise<void> {
    const playedMatchesPlain = await Vue.$worker.run((matches: Match[], player: Player, opponent: Player) => {
      return matches.filter((match) =>
        (match.winner.id === player.id && match.loser.id === opponent.id) ||
        (match.loser.id === player.id && match.winner.id === opponent.id));
    }, [
        classToPlain(state.matches),
        classToPlain(head2head.player),
        classToPlain(head2head.opponent),
      ]);
    const playedMatches = plainToClass(Match, playedMatchesPlain);

    // const playedMatches = state.matches.filter((match) =>
    //   (match.winner.id === head2head.player.id && match.loser.id === head2head.opponent.id) ||
    //   (match.loser.id === head2head.player.id && match.winner.id === head2head.opponent.id));

    commit(mutationTypes.SET_NEW_HEAD_2_HEAD, head2head);
    commit(mutationTypes.SET_PLAYED_MATCHES, playedMatches);
    dispatch(actionTypes.FILTER_MATCHES);
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  async [actionTypes.INIT]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): Promise<void> {

    commit(mutationTypes.INIT_DATA, {
      players: plainToClass(Player, playersJson),
      rankings: plainToClass(Ranking, rankingsJson),
      matches: plainToClass(Match, matchesJson),
    });

    const result = await Vue.$worker.run<any>((players: Player[], playerId: string, opponentId: string) => {

      return {
        player: players.filter((player) => player.id === playerId)[0],
        opponent: players.filter((player) => player.id === opponentId)[0],
      };
    }, [
        classToPlain(state.players),
        state.rankings[0].id,
        state.rankings[1].id,
      ]);

    dispatch(actionTypes.LOAD_HEAD_2_HEAD_STATS, {
      player: plainToClass(Player, result.player),
      opponent: plainToClass(Player, result.opponent),
    });

    // dispatch(actionTypes.LOAD_HEAD_2_HEAD_STATS, {
    //   player: state.players.filter((player) => player.id === state.rankings[0].id)[0],
    //   opponent: state.players.filter((player) => player.id === state.rankings[1].id)[0],
    // });
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  async [actionTypes.FILTER_MATCHES]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): Promise<void> {
    commit(mutationTypes.SET_FILTERING, true);
    log.info('Start filtering matches for the head 2 head');
    let filteredMatches: Match[] = state.playedMatches;

    // matches = matches.filter((match) => match.filterSurface(state.filters.surface));
    // matches = matches.filter((match) => match.filterTournament(state.filters.tournament));
    // matches = matches.filter((match) => match.filterYear(state.filters.year));
    // matches = matches.sort((a: Match, b: Match) => b.date.diff(a.date));

    const playedMatchesPlain = await Vue.$worker.run<any[]>((matches: Match[], filter: FilterOptions, level: any) => {
      const parseDate = (datestring: string): Date =>
        new Date(`${datestring.substring(0, 4)}-${datestring.substring(4, 6)}-${datestring.substring(6, 8)}`);

      // matches = matches.sort((a: any, b: any) => {
      //   const dateA = parseDate(b.tourney_date);
      //   const dateB = parseDate(a.tourney_date);
      //   const diff = dateA.getTime() - dateB.getTime();
      //   return diff;
      // });

      matches = matches.filter((match) => filter.surface === 'Overall' || match.surface === filter.surface);
      matches = matches.filter((match) => filter.year === 'Overall' || (match as any).tourney_date.substring(0, 4) === filter.year);
      matches = matches.filter((match) => filter.tournament === 'Overall' || level[(match as any).tourney_level] === filter.tournament);

      return matches;
    }, [
        classToPlain(filteredMatches),
        state.filters,
        tournamentLevel,
      ]);
    filteredMatches = plainToClass(Match, playedMatchesPlain);

    commit(mutationTypes.SET_FILTERED_MATCHES, filteredMatches);
    commit(mutationTypes.SET_FILTERING, false);
    dispatch(actionTypes.CALCULATE_STATS);
  },
  [actionTypes.SET_FILTER_SURFACE]({ commit, dispatch }: ActionContext<TennisState, TennisState>, selectedSurface: string): void {
    commit(mutationTypes.SET_FILTER_SURFACE, selectedSurface);
    dispatch(actionTypes.FILTER_MATCHES);
  },
  [actionTypes.SET_FILTER_TOURNAMENT]({ commit, dispatch }: ActionContext<TennisState, TennisState>, selectedTournament: string): void {
    commit(mutationTypes.SET_FILTER_TOURNAMENT, selectedTournament);
    dispatch(actionTypes.FILTER_MATCHES);
  },
  [actionTypes.SET_FILTER_YEAR]({ commit, dispatch }: ActionContext<TennisState, TennisState>, selectedYear: string): void {
    commit(mutationTypes.SET_FILTER_YEAR, selectedYear);
    dispatch(actionTypes.FILTER_MATCHES);
  },
  /**
   * Loads all the matches of the given head 2 head.
   */
  async[actionTypes.CALCULATE_STATS]({ commit, state, dispatch }: ActionContext<TennisState, TennisState>): Promise<void> {
    commit(mutationTypes.SET_CALCULATING, true);
    const player = Object.assign(new Player(), state.player);
    const opponent = Object.assign(new Player(), state.opponent);

    if (state.filteredMatches && state.filteredMatches.length > 0) {
      interface Result {
        player: {
          wins: number
          sets: number
          games: number
        };
        opponent: {
          wins: number
          sets: number
          games: number
        };
      }

      const result: Result = await Vue.$worker.run<Result>((matches: Match[], playerId: string, opponentId: string) => {
        const sumReducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
        const data = {
          player: {
            wins: 0,
            sets: 0,
            games: 0,
          },
          opponent: {
            wins: 0,
            sets: 0,
            games: 0,
          },
        };

        data.player.wins = matches.filter((m) => m.winner.id === playerId).length;
        data.opponent.wins = matches.filter((m) => m.winner.id === opponentId).length;

        data.player.sets = matches.map((m) =>
          m.winner.id === playerId ? m.winner.amountSets : m.loser.amountSets).reduce(sumReducer);
        data.opponent.sets = matches.map((m) =>
          m.winner.id === opponentId ? m.winner.amountSets : m.loser.amountSets).reduce(sumReducer);

        data.player.games = matches.map((m) =>
          m.winner.id === playerId ? m.winner.amountGames : m.loser.amountGames).reduce(sumReducer);
        data.opponent.games = matches.map((m) =>
          m.winner.id === opponentId ? m.winner.amountGames : m.loser.amountGames).reduce(sumReducer);

        return data;
      }, [
          classToPlain(state.filteredMatches),
          player.id,
          opponent.id,
        ]);

      player.wins = result.player.wins;
      player.sets = result.player.sets;
      player.games = result.player.games;

      opponent.wins = result.opponent.wins;
      opponent.sets = result.opponent.sets;
      opponent.games = result.opponent.games;

      // player.wins = state.filteredMatches.filter((m) => m.winner.id === state.player.id).length;
      // opponent.wins = state.filteredMatches.filter((m) => m.winner.id === state.opponent.id).length;

      // player.sets = state.filteredMatches.map((m) =>
      //   m.winner.id === state.player.id ? m.winner.amountSets : m.loser.amountSets).reduce(sumReducer);
      // opponent.sets = state.filteredMatches.map((m) =>
      //   m.winner.id === state.opponent.id ? m.winner.amountSets : m.loser.amountSets).reduce(sumReducer);

      // player.games = state.filteredMatches.map((m) =>
      //   m.winner.id === state.player.id ? m.winner.amountGames : m.loser.amountGames).reduce(sumReducer);
      // opponent.games = state.filteredMatches.map((m) =>
      //   m.winner.id === state.opponent.id ? m.winner.amountGames : m.loser.amountGames).reduce(sumReducer);
    } else {
      player.wins = 0;
      opponent.wins = 0;
      player.sets = 0;
      opponent.sets = 0;
      player.games = 0;
      opponent.games = 0;
    }

    player.ranking = state.rankings.filter((ranking) => ranking.id === state.player.id)[0];
    opponent.ranking = state.rankings.filter((ranking) => ranking.id === state.opponent.id)[0];

    commit(mutationTypes.SET_NEW_HEAD_2_HEAD, { player, opponent });
    commit(mutationTypes.SET_CALCULATING, false);
    commit(mutationTypes.SET_INITIALIZED, true);
  },
};
