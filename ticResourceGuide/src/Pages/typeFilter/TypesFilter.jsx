import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceContext } from '../../context/ResourceContext';
import styles from './TypesFilter.module.css';
import Button from '../../components/Button/Button';

const TypeFilter = () => {
  const navigate = useNavigate();
  const { setTypeFilter, timeFilter } = useContext(ResourceContext);

  const handleTypeSelect = (type) => {
    setTypeFilter(type);
    navigate('/resources');
  };

  return (
    <div className={styles.typeFilter}>
      <p>Time: Less than {timeFilter.max} </p>
      <h2>Select the type of resource:</h2>
      <div className={styles.buttonGroup}>
        <Button onClick={() => handleTypeSelect('article')}>Articles</Button>
        <Button onClick={() => handleTypeSelect('video')}>Videos</Button>
        <Button onClick={() => handleTypeSelect('research-paper')}>Research Papers</Button>
      </div>
    </div>
  );
};

export default TypeFilter;