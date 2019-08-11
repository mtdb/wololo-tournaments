import React from 'react';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';

import { getScores } from '../../contrib/results';

interface IPlayerScore {
  player: string;
  score: number;
}

interface IPrediction {
  result: IPlayerScore[];
  chance: number;
}

interface IProps {
  predictions: IPrediction[];
  width: number;
  height: number;
  onClick: () => void;
}

const colors = [
  '#1565c0',
  '#c62828',
  '#2e7d32',
  '#f9a825',
  '#009688',
  '#7b1fa2',
  '#616161',
  '#ef6c00'
];

const parseData = (players: string[], predictions: IPrediction[]) => {
  const scores = getScores(players, predictions);
  return [
    scores.reduce(
      (acc, score) => ({
        ...acc,
        [score.player]: 1
      }),
      { playerScoreKey: 'base' }
    ),
    scores.reduce(
      (acc, score) => ({
        ...acc,
        [score.player]: score.chance
      }),
      { playerScoreKey: 'total' }
    )
  ];
};

const toPercent = (decimal: number, fixed = 0) => {
  return `${(decimal * 100).toFixed(fixed)}%`;
};

export const MainChart = ({ predictions, width, height, onClick }: IProps) => {
  const players = predictions[0].result.map(p => p.player);
  const data = parseData(players, predictions);

  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      stackOffset="expand"
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      onClick={onClick}
    >
      <XAxis dataKey="playerScoreKey" hide={true} />
      <YAxis tickFormatter={toPercent} hide={true} />
      {players.map((player, index) => (
        <Area
          animationDuration={800}
          key={player}
          type="monotone"
          dataKey={player}
          stackId="1"
          stroke={colors[index]}
          fill={colors[index]}
        />
      ))}
    </AreaChart>
  );
};
