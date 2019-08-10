import { navigate } from '@reach/router';
import React from 'react';
import { routes } from '../../App';
import './Games.scss';

import 'flag-icon-css/css/flag-icon.css';
// const ar = require('svg-country-flags/svg/ar.svg');
// const es = require('svg-country-flags/svg/es.svg');

const games = [
  [
    {
      country: 'no',
      name: 'TheViper'
    },
    {
      country: 'vn',
      name: 'ACCM'
    }
  ],
  [
    {
      country: 'ca',
      name: 'Hera_'
    },
    {
      country: 'es',
      name: 'TaToH'
    }
  ],
  [
    {
      country: 'fi',
      name: '_TheMax_'
    },
    {
      country: 'cn',
      name: 'Lyx'
    }
  ],
  [
    {
      country: 'cn',
      name: 'Mr YO'
    },
    {
      country: 'tw',
      name: 'Slam'
    }
  ],
  [
    {
      country: 'at',
      name: 'Liereyy'
    },
    {
      country: 'fi',
      name: 'Villese'
    }
  ],
  [
    {
      country: 'no',
      name: 'MbL'
    },
    {
      country: 'ar',
      name: 'Nicov'
    }
  ],
  [
    {
      country: 'cn',
      name: 'Fat_Dragon'
    },
    {
      country: 'br',
      name: 'RiuT'
    }
  ],
  [
    {
      country: 'cn',
      name: 'Yinghua'
    },
    {
      country: 'es',
      name: 'LaaaaaN'
    }
  ]
];

const Games = () => (
  <div id="Games">
    {games.map(game => (
      <div
        className="game-summary"
        key={`game-${game[0].name}-${game[0].name}`}
        onClick={() => {
          navigate(routes.game('king-of-the-desert', 'nicov'));
        }}
      >
        <div className="header">King of the Desert 3</div>
        <div className="content">
          <div className={`flag-icon flag-icon-${game[0].country} left`} />
          <div className="inner-content">
            <div className="players">
              <div className="player-name p1">{game[0].name}</div>
              <div className="vs">vs</div>
              <div className="player-name p2">{game[1].name}</div>
            </div>
          </div>
          <div className={`flag-icon flag-icon-${game[1].country} right`} />
        </div>
        <div className="footer">20/07/2019 12:00</div>
      </div>
    ))}
  </div>
);

export { Games };
