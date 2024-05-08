import React from 'react'
import styles from './styles.module.css'

const Card = ({ onLogout, onGoToAdmin, user }) => {
  return (
    <div className={styles.card}>
      {user.id.length > 0 && (
        <div className={styles.row} onClick={onLogout}>
          Logout
        </div>
      )}
      {user.isAdmin && (
        <div className={styles.row} onClick={onGoToAdmin}>
          Go to Admin
        </div>
      )}
    </div>
  )
}

export default Card
