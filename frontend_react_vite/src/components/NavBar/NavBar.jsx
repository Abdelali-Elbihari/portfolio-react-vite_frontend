import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { images } from '../../constants';

import './NavBar.scss';

const links = ['home', 'about', 'contact', 'work', 'skills'];

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className='app__navbar'>
      {/* Mobile menu */}
      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [-200, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {links.map((link) => (
                <li key={`menu-${link}`}>
                  <Link to={`/${link}`} onClick={() => setToggle(false)}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      <ul className='app__navbar-links'>
        {links.map((link) => (
          <li className='app__flex p-text' key={`link-${link}`}>
            <div />
            <Link to={`/${link}`}>{link}</Link>
          </li>
        ))}
      </ul>

      <div className='app__navbar-logo'>
        <img src={images.logo} alt='logo' />
      </div>
    </nav>
  );
};

export default NavBar;
