import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceContext } from '../../context/ResourceContext';
import styles from './IntroPage.module.css';
import Button from '../../components/Button/Button';

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
      <h2>Welcome to TIC Time!</h2>
      <div className={styles.hero}>
      <iframe
							src="https://www.youtube.com/embed/BjY1SJewEL8"
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
              className={styles.ifram}
              ></iframe>
      <p>"I experienced patients that were behaving in ways that were really stressful, cursing, yelling, really heightened emotions at the front desk, in my office, breakdowns. We might naturally ask ourselves “What is wrong with that person?”
Trauma-informed care is really about saying “What happened?” “Why would a person behave that way?” Rather than “What’s wrong?” "
Dana E. Crawford, PhD
Director - Trauma Informed Care Program Montefiore Medical Group</p>
      </div>
      <p>Select the amount of time you have available:</p>
      <div className={styles.buttonGroup}>
        <Button onClick={() => handleTimeSelect(0, 5)}>Less than 5 mins</Button>
        <Button onClick={() => handleTimeSelect(0, 20)}>Less than 20 mins</Button>
        <Button onClick={() => handleTimeSelect(20, Infinity)}>More than 20 mins</Button>
      </div>
    </div>
  );
};

export default IntroPage;