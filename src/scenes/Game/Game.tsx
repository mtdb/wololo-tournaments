import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { CivIcon, CivilizationType } from '../../components/CivIcon/CivIcon';
import MainChart from '../../components/MainChart';
import { Modal } from '../../components/Modal/Modal';
import Predictions from '../../components/Predictions';
import ScorePicker from '../../components/ScorePicker';
import VsTitle from '../../components/VsTitle';
import { useResizeHandler } from '../../hooks/resizeHandler';
import './Game.scss';

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
    chance: 13,
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
    chance: 12,
    result: [{ player: 'TheViper', score: 2 }, { player: 'TaToH', score: 5 }]
  }
];

const scores = [
  { player: 'TheViper', score: 0 },
  { player: 'TaToH', score: 0 },
  { player: 'Mr. Yo', score: 0 },
  { player: 'Leerey', score: 0 },
  { player: 'Nikov', score: 0 },
  { player: 'Vivi', score: 0 },
  { player: 'DauT', score: 0 },
  { player: '_TheMax_', score: 0 }
];

const civs = [
  'aztecs',
  'berbers',
  'britons',
  'burmese',
  'byzantines',
  'celts',
  'chinese',
  'ethiopians',
  'franks',
  'goths',
  'huns',
  'incas',
  'indians',
  'italians',
  'japanese',
  'khmer',
  'koreans',
  'magyars',
  'malay',
  'malians',
  'mayans',
  'mongols',
  'persians',
  'portuguese',
  'random',
  'saracens',
  'slavs',
  'spanish',
  'teutons',
  'turks',
  'vietnamese',
  'vikings'
];

type ModalState = false | 'predictions' | 'scores';

const player1 = 'Nikov';
const player2 = 'Daut';
const players = [player1, player2];

const Game = () => {
  const [modal, setModal] = useState<ModalState>(false);

  const openPredictions = () => setModal('predictions');
  const openScores = () => setModal('scores');

  const closeModal = () => {
    setModal(false);
  };

  const { windowWidth } = useResizeHandler();
  const chartSizeY = Math.floor(windowWidth / 3) - (10 + 20);
  const chartSizeX = Math.floor(windowWidth / 3) - 10;

  return (
    <div id="Game">
      <div className="paper">
        <header>
          <h2>King of the Desert 3</h2>
          <div className="vs-title">
            <VsTitle players={players} />
          </div>
          <b>best of 5</b>
        </header>
        <div className="top-actions">
          <div className="box">
            <div className="head">predictions</div>
            <MainChart
              predictions={predictions}
              width={chartSizeX}
              height={chartSizeY}
              onClick={openPredictions}
            />
          </div>
          <div className="box score">
            <div className="head">score</div>
            <div className="values">0:0</div>
          </div>
          <div className="box button">
            <Button
              onClick={openScores}
              variant="outlined"
              color="secondary"
              style={{ height: chartSizeY }}
            >
              Make my Prediction
            </Button>
          </div>
        </div>

        <h2>Matches</h2>
        {[1, 2, 3].map(i => (
          <div className="match" key={`game-${i}`}>
            <div className="left">
              <span>Match</span>
              <div>{i}</div>
            </div>
            <div className="players">
              {players.map((player, index) => (
                <div className="player-row" key={`${i}-${index}`}>
                  <CivIcon type={civs[i * (index + 1)] as CivilizationType} /> {player}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Modal open={!!modal} onClose={closeModal}>
        {modal === 'predictions' ? (
          <Predictions predictions={predictions} />
        ) : (
          <ScorePicker scores={scores} />
        )}
      </Modal>
    </div>
  );
};

export { Game };
