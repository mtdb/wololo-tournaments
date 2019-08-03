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
        <div className="content">
          <div className={`flag-icon flag-icon-${game[0].country} flag-icon-squared`} />
          <div className="inner-content">
            <div className="header">King of the Desert 3</div>
            <div className="player-name">{game[0].name}</div>
            <div>vs</div>
            <div className="player-name">{game[1].name}</div>
            <div className="footer">20/07/2019 12:00</div>
          </div>
          <div className={`flag-icon flag-icon-${game[1].country} flag-icon-squared`} />
        </div>
      </div>
    ))}
  </div>
);

export { Games };
