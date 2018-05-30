import { plainToClass } from 'class-transformer';

import { Player } from '@/app/models/Player';
import { PagedMatches } from '@/app/models/PagedMatches';

import fedVsNadJson from '@/mock/matches/fed-vs-nad.json';
import djoVsNadJson from '@/mock/matches/djo-vs-nad.json';
import fedVsDjoJson from '@/mock/matches/fed-vs-djo.json';

const isHead2HeadBase = (player: Player, opponent: Player) => (duel: string) => {
  const keyA = duel.split('-vs-')[0];
  const keyB = duel.split('-vs-')[1];
  return (player.key === keyA && opponent.key === keyB) || (player.key === keyB && opponent.key === keyA);
};

export function findHead2HeadStats(player: Player, opponent: Player): PagedMatches {
  const isHead2Head = isHead2HeadBase(player, opponent);

  let pagedMatches = {};
  if (isHead2Head('fed-vs-nad')) {
    pagedMatches = fedVsNadJson;
  } else if (isHead2Head('fed-vs-djo')) {
    pagedMatches = fedVsNadJson;
  } else if (isHead2Head('djo-vs-nad')) {
    pagedMatches = fedVsNadJson;
  }

  return plainToClass(PagedMatches, pagedMatches);
}
