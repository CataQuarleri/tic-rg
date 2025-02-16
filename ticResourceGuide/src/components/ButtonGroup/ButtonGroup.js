import React from 'react'
import styles from './buttonGroup.module.css'
function ButtonGroup() {

  return (
    <div className={styles.mainContainer}>
        {children}
    </div>
  )
}

export default ButtonGroup