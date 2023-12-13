import React from 'react';
import { About, Footer, Header, Experiences, Projects } from './container/index.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
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
