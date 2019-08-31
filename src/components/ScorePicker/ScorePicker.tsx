import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';

import { IGameScores } from '../../store/games/store';
import './ScorePicker.scss';
// import { getScores } from '../../contrib/results';

interface IProps {
  scores: IGameScores;
}

export const ScorePicker = ({ scores }: IProps) => {
  const players = Object.keys(scores);

  return (
    <div id="ScorePicker">
      <div className="title">
        {players
          .map((player, index) => (
            <span key={`p${index + 1}`} className={`p${index + 1}`}>
              {scores[player].player.name}
            </span>
          ))
          .reduce((accu: any, elem) => {
            return accu === null ? [elem] : [...accu, <span key={`vs${elem.key}`}>vs</span>, elem];
          }, null)}
        <span>Your Prediction:</span>
      </div>

      <div className="score-table">
        {players.map((player, index) => (
          <div className="row" key={`score-${index}`}>
            <div className={`player`}>
              <div className={`p${index + 1}`}>{scores[player].player.name}</div>:
            </div>
            <TextField
              id="outlined-bare"
              defaultValue={0}
              margin="normal"
              variant="outlined"
              type="number"
              inputProps={{ min: 0 }}
            />
          </div>
        ))}
      </div>

      <div className="actions">
        <Button variant="contained" color="primary" className="submit">
          Save
        </Button>
      </div>
    </div>
  );
};
