
const sumReducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

export const gamesAmountTransformer = (score: string, position: number = 0): number => {
  const setsPairs = score.split(' ');
  return setsPairs.map((setPair) => {
    try {
      const gamesPair = setPair.split('-').map((gamePair) => gamePair.split('(')[0]);
      return parseInt(gamesPair[position], 10);
    } catch (e) {
      return 0;
    }
  }
  ).reduce(sumReducer);
};

export const setsAmountTransformer = (score: string, position: number = 0): number => {
  const opponentPosition: number = (position === 0) ? 1 : 0;
  const setsPairs = score.split(' ');
  return setsPairs.map((setPair) => {
    try {
      const gamesPair = setPair.split('-').map((gamePair) => gamePair.split('(')[0]);
      return (parseInt(gamesPair[position], 10) > parseInt(gamesPair[opponentPosition], 10)) ? 1 : 0;
    } catch (e) {
      return 0 as number;
    }
  }
  ).reduce(sumReducer);
};
