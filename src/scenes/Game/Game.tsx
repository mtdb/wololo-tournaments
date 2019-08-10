import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';
import React, { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { routes } from '../../App';
import { Modal } from '../../components/Modal/Modal';
import Predictions from '../../components/Predictions';
import { useResizeHandler } from '../../hooks/resizeHandler';
import './Game.scss';

const data = [{ name: 'Group A', value: 55 }, { name: 'Group B', value: 45 }];
const colors = ['#1565c0', '#c62828'];

const Game = () => {
  const [modalOpen, setModal] = useState(false);

  const toggleModal = () => setModal(!modalOpen);
  const closeModal = () => {
    setModal(false);
  };

  const { windowWidth } = useResizeHandler();
  const chartSize = Math.floor(windowWidth / 3) - (10 + 20);

  const predictions = [
    {
      chance: 20,
      result: [{ player: 'TheViper', score: 5 }, { player: 'TaToH', score: 4 }]
    },
    {
      chance: 20,
      result: [{ player: 'TheViper', score: 5 }, { player: 'TaToH', score: 3 }]
    },
    {
      chance: 10,
      result: [{ player: 'TheViper', score: 5 }, { player: 'TaToH', score: 2 }]
    },
    {
      chance: 5,
      result: [{ player: 'TheViper', score: 5 }, { player: 'TaToH', score: 0 }]
    },
    {
      chance: 30,
      result: [{ player: 'TheViper', score: 4 }, { player: 'TaToH', score: 5 }]
    },
    {
      chance: 15,
      result: [{ player: 'TheViper', score: 2 }, { player: 'TaToH', score: 5 }]
    }
  ];

  return (
    <div id="Game">
      <header>
        <h2>King of the Desert 3</h2>
        <span>Nicov vs Tatoh</span>
        <i>best of 5</i>
      </header>
      <div className="paper top-actions">
        <div className="box">
          <div className="head">predictions</div>
          <PieChart width={chartSize} height={chartSize} onClick={toggleModal}>
            <Pie
              startAngle={90}
              animationDuration={300}
              endAngle={450}
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={chartSize / 2 - 5}
            >
              {data.map((_, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
            </Pie>
          </PieChart>
        </div>
        <div className="box score">
          <div className="head">score</div>
          <div className="values">0:0</div>
        </div>
        <div className="box">
          <Button>Make my Prediction</Button>
        </div>
      </div>
      <ul>
        <li>
          <Link to={routes.game()}>Matches</Link>
        </li>
        <li>
          <Link to={routes.gamePredictions()}>Predictions</Link>
        </li>
      </ul>
      {[1, 2, 3].map(i => (
        <div className="match" key={`game-${i}`}>
          Match {i}
        </div>
      ))}
      <Modal open={modalOpen} onClose={closeModal}>
        <Predictions predictions={predictions} />
      </Modal>
    </div>
  );
};

export { Game };
