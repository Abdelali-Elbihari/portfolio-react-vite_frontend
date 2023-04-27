import React from 'react';
import PropTypes from 'prop-types';
import { navBarLinks } from '../constants';

const NavigationDots = ({ active }) => (
  <div className='app__navigation'>
    {navBarLinks.map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className={`app__navigation-dot ${active === item ? 'dot-active' : ''}`}
      />
    ))}
  </div>
);

NavigationDots.propTypes = {
  active: PropTypes.string.isRequired
};

export default NavigationDots;
