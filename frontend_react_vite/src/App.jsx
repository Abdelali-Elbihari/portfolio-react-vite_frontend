import React from 'react';
import { About, Footer, Header, Experiences, Projects } from './container';
import NavBar from './components/NavBar/NavBar';
import './App.scss';

const App = () => {
  return (
    <div className='app'>
      <NavBar />
      <Header />
      <About />
      <Projects />
      <Experiences />
      <Footer />
    </div>
  );
};

export default App;
