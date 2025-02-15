import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceContext } from '../../context/ResourceContext';
import styles from './IntroPage.module.css';

const IntroPage = () => {
  const navigate = useNavigate();
  const { setTimeFilter } = useContext(ResourceContext);

  // The three time filters: less than 5 mins, less than 20 mins, and more than 20 mins.
  const handleTimeSelect = (min, max) => {
    setTimeFilter({ min, max });
    navigate('/type');
  };

  return (
    <div className={styles.intro}>
      <h2>Welcome to the TIC Resource Guide</h2>
      <p>Select the amount of time you have available:</p>
      <div className={styles.buttonGroup}>
        <button onClick={() => handleTimeSelect(0, 5)}>Less than 5 mins</button>
        <button onClick={() => handleTimeSelect(5, 20)}>Less than 20 mins</button>
        <button onClick={() => handleTimeSelect(20, Infinity)}>More than 20 mins</button>
      </div>
    </div>
  );
};

export default IntroPage;