import React from 'react';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
         <h1>TIC Resource Guide</h1>
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