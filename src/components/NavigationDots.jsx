import React from 'react';
import PropTypes from 'prop-types';
import { navBarLinks } from '../constants/index.js';
import { SocialMedia } from './index.jsx';

const NavigationDots = ({ active }) => (
  <div className='app__navigation'>
    {navBarLinks.map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className={`app__navigation-dot ${active === item ? 'dot-active' : ''}`}
      />
    ))}
    <SocialMedia />
  </div>
);

NavigationDots.propTypes = {
  active: PropTypes.string.isRequired
};

export default NavigationDots;
