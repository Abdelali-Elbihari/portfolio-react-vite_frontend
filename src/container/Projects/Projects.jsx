import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper/index.jsx';
import { urlFor, client } from '../../client.js';
import './Projects.scss';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filterProject, setFilterProject] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "projects"]';

    client.fetch(query).then((data) => {
      setProjects(data);
      setFilterProject(data);
    });
  }, []);

  const handleProjectFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterProject(projects);
      } else {
        setFilterProject(projects.filter((project) => project.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className='head-text'>
        <span>My Projects</span>
      </h2>

      <div className='app__project-filter'>
        {['All', 'Portfolio', 'Web App', 'Mobile App', 'React JS', 'Node.js'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleProjectFilter(item)}
            className={`app__project-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__project-portfolio'
      >
        {filterProject.map((project, index) => (
          <div className='app__project-item app__flex' key={index}>
            <div className='app__project-img app__flex'>
              <img src={project?.imgUrl?.asset?._ref ? urlFor(project.imgUrl) : project.imgUrl} alt={project.name} />
            </div>
            <div className='app__project-links'>
              <a href={project.projectLink} target={project?.projectLink?.startsWith("#") ? '':'_blank'}rel='noreferrer'>
                <motion.div
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 1.4], duration: 0.2 }}
                  transition={{ duration: 0.25 }}
                  className='app__flex'
                >
                  <VisibilityIcon />
                </motion.div>
              </a>
              <a href={project.codeLink} target={'_blank'} rel='noreferrer'>
                <motion.div
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 1.4], duration: 0.2 }}
                  transition={{ duration: 0.25 }}
                  className='app__flex'
                >
                  <GitHubIcon />
                </motion.div>
              </a>
            </div>
            <div className='app__project-content app__flex'>
              <h4 className='bold-text'>{project.title}</h4>
              <p className='p-text' style={{ marginTop: 10 }}>
                {project.description}
              </p>

              <div className='app__project-tag app__flex'>
                <p className='p-text'>{project.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Projects, 'app__projects'), 'projects', 'app__primarybg');
