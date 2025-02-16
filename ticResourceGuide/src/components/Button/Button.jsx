import React from 'react'
import styles from './button.module.css'

function Button({onClick, children}) {
  return (
    <button onClick={onClick} className={styles.button}>
        {children}
    </button>
  )
}

export default Button