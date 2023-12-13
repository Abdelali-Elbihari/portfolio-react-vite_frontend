import React from 'react';
import { NavigationDots } from '../components/index.jsx';

const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <div className='app__wrapper app__flex'>
          <Component />
          {idName === 'contact' && (
            <div className='copyright'>
              <p className='p-text'>@2023 ABDELALI</p>
              <p className='p-text'>All rights reserved</p>
            </div>
          )}
        </div>
          <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
