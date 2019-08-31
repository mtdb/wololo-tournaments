import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { CivIcon, CivilizationType } from '../../components/CivIcon/CivIcon';
import MainChart from '../../components/MainChart';
import { Modal } from '../../components/Modal/Modal';
import Predictions from '../../components/Predictions';
import ScorePicker from '../../components/ScorePicker';
import VsTitle from '../../components/VsTitle';
import { withContext } from '../../contrib/context';
import { useResizeHandler } from '../../hooks/resizeHandler';
import { IActions } from '../../store';
import { IGameScores, IGamesStore } from '../../store/games/store';
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

type ModalState = false | 'predictions' | 'scores';

const GameComponent = ({
  actions: {
    games: { get: getGame }
  },
  games: { game: retrievedGame },
  slug
}: {
  actions: IActions;
  games: IGamesStore;
  slug: string;
}) => {
  const [modal, setModal] = useState<ModalState>(false);

  const openPredictions = () => setModal('predictions');
  const openScores = () => setModal('scores');

  const closeModal = () => {
    setModal(false);
  };

  const { windowWidth } = useResizeHandler();
  const chartSizeY = Math.floor(windowWidth / 3) - (10 + 20);
  const chartSizeX = Math.floor(windowWidth / 3) - 10;

  useEffect(
    () => {
      getGame(slug);
    },
    [getGame, slug]
  );

  const game = retrievedGame[slug] || {
    matches: [],
    number_of_matches: 1,
    players: [],
    tournament: {}
  };

  const matches = game.matches.concat(
    Array(game.number_of_matches - game.matches.length).fill({
      civilizations: []
    })
  );

  let scores: IGameScores = game.players.reduce(
    (sc, player) => ({
      ...sc,
      [player.team]: {
        player,
        score: 0
      }
    }),
    {}
  );

  game.matches.map(match => {
    scores = {
      ...scores,
      [match.winner]: {
        ...scores[match.winner],
        score: scores[match.winner].score + 1
      }
    };
  });

  return (
    <div id="Game">
      <div className="paper">
        <header>
          <h2>{game.tournament.name}</h2>
          <div className="vs-title">
            <VsTitle players={game.players} />
          </div>
          <b>best of {game.number_of_matches}</b>
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
            <div className="values">
              {Object.keys(scores).map((key, i) => (
                <span key={key}>
                  {i !== 0 && ':'}
                  {scores[key].player.name}
                </span>
              ))}
            </div>
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
        {matches.map((match, i) => (
          <div className="match" key={`game-${i}`}>
            <div className="left">
              <span>Match</span>
              <div>{i + 1}</div>
            </div>
            <div className="players">
              {match.civilizations.map(({ player, civilization }, index) => (
                <div className="player-row" key={`${i}-${index}`}>
                  <CivIcon type={civilization as CivilizationType} /> {player}
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

const Game = withContext(GameComponent, 'actions', 'games');

export { Game };
