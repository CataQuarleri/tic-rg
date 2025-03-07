import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceContext } from '../../context/ResourceContext';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { clearFilters } = useContext(ResourceContext);

  const handleGoHome = () => {
    clearFilters();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
         <h1 onClick={handleGoHome}>Trauma-Informed-Care Time</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
         {children}
        </div>
      </main>
      <footer className={styles.footer}>
         <p>&copy; 2025 TIC Resource Guide</p>
      </footer>
    </div>
  );
};

export default Layout;