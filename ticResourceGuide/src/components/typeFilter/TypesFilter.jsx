import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceContext } from '../../context/ResourceContext';
import styles from './TypesFilter.module.css';

const TypeFilter = () => {
  const navigate = useNavigate();
  const { setTypeFilter } = useContext(ResourceContext);

  const handleTypeSelect = (type) => {
    setTypeFilter(type);
    navigate('/resources');
  };

  return (
    <div className={styles.typeFilter}>
      <h2>Select the type of resource:</h2>
      <div className={styles.buttonGroup}>
        <button onClick={() => handleTypeSelect('article')}>Articles</button>
        <button onClick={() => handleTypeSelect('video')}>Videos</button>
        <button onClick={() => handleTypeSelect('research')}>Research Papers</button>
      </div>
    </div>
  );
};

export default TypeFilter;