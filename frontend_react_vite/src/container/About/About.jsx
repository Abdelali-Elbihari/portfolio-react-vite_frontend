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
    const query = '*[_type == "abouts"]';
    const fetchData = async () => {
      try {
        const data = await client.fetch(query, { signal });
        const sortedData = data.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt));
        setAbouts(sortedData || defaultAbouts);
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
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className='app__profile-item'
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className='bold-text' style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className='p-text' style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(About, 'app__about'), 'about', 'app__whitebg');
