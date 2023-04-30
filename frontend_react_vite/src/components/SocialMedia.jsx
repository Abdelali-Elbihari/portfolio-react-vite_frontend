import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const SocialMedia = () => (
  <div className='app__social'>
    <div>
      <LinkedInIcon onClick={() => window.open('https://www.linkedin.com/in/abdelali-e-4646701a1')} />
    </div>
    <div>
      <GitHubIcon onClick={() => window.open('https://github.com/Abdelali-Elbihari')} />
    </div>
  </div>
);

export default SocialMedia;
