import React, { useState, useCallback } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { images, navBarLinks } from '../../constants';

import './NavBar.scss';

const NavLink = React.memo(({ link, onClick }) => (
  <li className='app__flex p-text'>
    <a href={`#${link}`} onClick={onClick}>
      {link}
    </a>
  </li>
));

NavLink.displayName = 'NavLink';

NavLink.propTypes = {
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const handleOpenToggle = useCallback(() => setToggle(true), []);
  const handleCloseToggle = useCallback(() => setToggle(false), []);

  return (
    <nav className='app__navbar'>
      {/* Mobile menu */}
      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={handleOpenToggle} />
        {toggle && (
          <motion.div whileInView={{ x: [-200, 0] }} transition={{ duration: 0.85, ease: 'easeOut' }}>
            <HiX onClick={handleCloseToggle} />
            <ul className='app__navbar-links'>
              {navBarLinks.map((link) => (
                <NavLink key={`link-${link}`} link={link} onClick={handleCloseToggle} />
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      <ul className='app__navbar-links'>
        {navBarLinks.map((link) => (
          <li className='app__flex p-text' key={`link-${link}`}>
            <div />
            <a href={`#${link}`}>{link}</a>
          </li>
        ))}
      </ul>

      <div className='app__navbar-logo'>
        <img src={images.logo} alt='logo' />
      </div>
    </nav>
  );
};

export default React.memo(NavBar);
