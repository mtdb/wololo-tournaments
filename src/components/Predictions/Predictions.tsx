import React from 'react';

import { getScores } from '../../contrib/results';
import VsTitle from '../VsTitle';
// TODO: move this to the store and import it
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
}

export const Predictions = ({ predictions }: IProps) => {
  const vsplayers = predictions[0].result.map(p => ({
    player: { name: p.player, country: 'ca', slug: 'p1' },
    team: 'p1'
  }));
  const players = predictions[0].result.map(p => p.player);
  const winner = getScores(players, predictions).reduce((prev, current) =>
    prev.chance > current.chance ? prev : current
  );
  return (
    <div>
      <div className="title">
        <VsTitle players={vsplayers} />
        <span>predictions</span>
      </div>
      <div className="main-result">
        {winner.chance}%{' '}
        <span className={`p${players.indexOf(winner.player) + 1}`}>{winner.player}</span> wins
      </div>
      <div className="result-table">
        {predictions.map((prediction, index) => (
          <div className="row" key={`pred-${index}`}>
            <div className="score">
              {prediction.result
                .map((res, rindex) => (
                  <span key={`p${rindex + 1}`} className={`p${rindex + 1}`}>
                    {res.score}
                  </span>
                ))
                .reduce((accu: any, elem) => {
                  return accu === null
                    ? [elem]
                    : [...accu, <span key={`vs${elem.key}`}>:</span>, elem];
                }, null)}
            </div>
            <div className="chance">{prediction.chance}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};
