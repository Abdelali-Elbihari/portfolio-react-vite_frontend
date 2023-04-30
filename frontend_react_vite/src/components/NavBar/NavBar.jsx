import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { images, navBarLinks } from '../../constants';
import { Drawer } from '@mui/material';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import './NavBar.scss';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenNavMenu = () => {
    setDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar position='f' className='app__navbar'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              className='app__navbar-menu-icon'
              size='small'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              className='app__navbar-menu'
              anchor='left'
              open={Boolean(drawerOpen)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <DrawerHeader>
                <IconButton className='app__navbar-menu-icon' onClick={handleCloseNavMenu}>
                  <ChevronLeftIcon size='small' />
                </IconButton>
              </DrawerHeader>

              {/* <Divider /> */}

              <ul className='app__navbar-menu-links'>
                {navBarLinks.map((link) => (
                  <li className='app__flex p-text' key={`link-${link}`} onClick={handleCloseNavMenu}>
                    <a href={`#${link}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </Drawer>
          </Box>

          <Box sx={{ flexGrow: { xs: 1, md: 1 }, display: { xs: 'none !important', md: 'flex !important' } }}>
            <ul className='app__navbar-links'>
              {navBarLinks.map((link) => (
                <li className='app__flex p-text' key={`link-${link}`}>
                  <div />
                  <a href={`#${link}`}>{link}</a>
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ flexGrow: { xs: 0, md: 0 }, justifyContent: 'flex-end' }}>
            <Avatar
              alt='Remy Sharp'
              variant='square'
              src={images.logo}
              sx={{ height: 65, width: 65, margin: '1rem 2rem 1rem 0', justifyContent: 'flex-end' }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
