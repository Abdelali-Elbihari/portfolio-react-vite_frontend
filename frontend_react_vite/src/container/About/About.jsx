import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { defaultAbouts } from '../../constants';
import { client, urlFor } from '../../client';
import './About.scss';

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const query = '*[_type == "abouts"] | order(_createdAt asc)';

    const fetchData = async () => {
      try {
        const data = await client.fetch(query, { signal });
        setAbouts(data?.length ? data : defaultAbouts);
      } catch (error) {
        setAbouts(defaultAbouts);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <h2 className='head-text'>
        <span>Good Software</span> leads to <span>Good Business</span>
      </h2>

      <div className='app__profiles'>
        {abouts.map((about, index) => (
          <Profile key={about.title + index} about={about} />
        ))}
      </div>
    </>
  );
};

export const Profile = ({ about }) => (
  <motion.div
    whileInView={{ opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.5, type: 'tween' }}
    className='app__profile-item'
    data-testid='profile-item'
  >
    <ProfileImage about={about} />
    <ProfileTitle about={about} />
    <ProfileDescription about={about} />
  </motion.div>
);

export const ProfileImage = ({ about }) => (
  <img src={about?.imgUrl?.asset?._ref ? urlFor(about.imgUrl) : about.imgUrl} alt={about.title} />
);

export const ProfileTitle = ({ about }) => (
  <h2 className='bold-text' style={{ marginTop: 20 }}>
    {about.title}
  </h2>
);

export const ProfileDescription = ({ about }) => (
  <p className='p-text' style={{ marginTop: 10 }}>
    {about.description}
  </p>
);

export default AppWrap(MotionWrap(About, 'app__about'), 'about', 'app__primarybg');
