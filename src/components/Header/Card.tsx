import React from 'react'
import styles from './styles.module.css'

const Card = ({ onLogout, onGoToAdmin }) => {
  return (
    <div className={styles.card}>
      <div className={styles.row} onClick={onLogout}>
        Logout
      </div>
      <div className={styles.row} onClick={onGoToAdmin}>
        Go to Admin
      </div>
    </div>
  )
}

export default Card
