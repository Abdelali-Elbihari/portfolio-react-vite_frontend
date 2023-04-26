import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const SocialMedia = () => (
  <div className='app__social'>
    <div>
      <FaLinkedin onClick={() => window.open('https://www.linkedin.com/in/abdelali-e-4646701a1')} />
    </div>
    <div>
      <FaGithub onClick={() => window.open('https://github.com/Abdelali-Elbihari')} />
    </div>
  </div>
);

export default SocialMedia;
