// TODO: move this to the store and import it
interface IPlayerScore {
  player: string;
  score: number;
}

interface IPrediction {
  result: IPlayerScore[];
  chance: number;
}

export const isWinner = (player: string, results: IPlayerScore[]): boolean =>
  results.reduce((prev, current) => (prev.score > current.score ? prev : current)).player ===
  player;

export const getScores = (players: string[], predictions: IPrediction[]) =>
  players.map(player => ({
    chance: predictions.reduce(
      (acc, prediction) => (isWinner(player, prediction.result) ? acc + prediction.chance : acc),
      0
    ),
    player
  }));
