import React from 'react';
import PropTypes from 'prop-types';

const NavigationDots = ({ active }) => (
  <div className='app__navigation'>
    {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item, index) => (
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
