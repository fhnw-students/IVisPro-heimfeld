import { Transform, Type, Exclude, Expose } from 'class-transformer';
import * as moment from 'moment';

import { MatchPlayer } from '@/app/models/MatchPlayer';

@Exclude()
export class Match {

  @Transform((value, obj, type) => `${obj.tourney_id}_${obj.match_num}`)
  @Expose() public id: number;

  @Expose({ name: 'tourney_name' }) public name: string;
  @Expose() public surface: string;
  @Expose({ name: 'draw_size' }) public drawSize: string;
  @Expose({ name: 'tourney_level' }) public tourneyLevel: string;
  @Expose() public score: string;
  @Expose() public best_of: string;
  @Expose() public round: string;
  @Expose() public minutes: string;

  @Expose({ name: 'tourney_date' })
  @Transform((value: string) => moment(new Date(parseInt(value, 10))), { toClassOnly: true })
  public date: moment.Moment;

  @Expose()
  @Transform((value, obj, type) => ({
    id: obj.winner_id,
    name: obj.winner_name,
    hand: obj.winner_hand,
    ht: obj.winner_ht,
    ioc: obj.winner_ioc,
    age: obj.winner_age,
    rank: obj.winner_rank,
    rankPoints: obj.winner_rank_points,
  }))
  @Type(() => MatchPlayer)
  public winner: MatchPlayer;

  @Expose()
  @Transform((value, obj, type) => ({
    id: obj.loser_id,
    name: obj.loser_name,
    hand: obj.loser_hand,
    ht: obj.loser_ht,
    ioc: obj.loser_ioc,
    age: obj.loser_age,
    rank: obj.loser_rank,
    rankPoints: obj.loser_rank_points,
  }))
  @Type(() => MatchPlayer)
  public loser: MatchPlayer;

}

/*
    "tourney_id": "2004-96",
    "tourney_name": "Athens Olympics",
    "surface": "Hard",
    "draw_size": "64",
    "tourney_level": "A",
    "tourney_date": "20040816",
    "match_num": "033",
    "winner_id": "104607",
    "winner_seed": "",
    "winner_entry": "",
    "winner_name": "Tomas Berdych",
    "winner_hand": "R",
    "winner_ht": "196",
    "winner_ioc": "CZE",
    "winner_age": "18.9130732375",
    "winner_rank": "79",
    "winner_rank_points": "511",
    "loser_id": "103819",
    "loser_seed": "1",
    "loser_entry": "",
    "loser_name": "Roger Federer",
    "loser_hand": "R",
    "loser_ht": "185",
    "loser_ioc": "SUI",
    "loser_age": "23.022587269",
    "loser_rank": "1",
    "loser_rank_points": "5910",
    "score": "4-6 7-5 7-5",
    "best_of": "3",
    "round": "R32",
    "minutes": "",
    "w_ace": "",
    "w_df": "",
    "w_svpt": "",
    "w_1stIn": "",
    "w_1stWon": "",
    "w_2ndWon": "",
    "w_SvGms": "",
    "w_bpSaved": "",
    "w_bpFaced": "",
    "l_ace": "",
    "l_df": "",
    "l_svpt": "",
    "l_1stIn": "",
    "l_1stWon": "",
    "l_2ndWon": "",
    "l_SvGms": "",
    "l_bpSaved": "",
    "l_bpFaced": ""
*/
