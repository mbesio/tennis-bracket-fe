import React from 'react'
import styles from './styles.module.css'

const Card = ({
  onLogout,
  onGoToTournaments,
  onGoToRanking,
  onGoToAdmin,
  user,
}) => {
  return (
    <div className={styles.card}>
      {user.id.length > 0 && (
        <div className={styles.row} onClick={onGoToTournaments}>
          Tournaments
        </div>
      )}
      {user.id.length > 0 && (
        <div className={styles.row} onClick={onGoToRanking}>
          Rankings
        </div>
      )}
      {user.isAdmin && (
        <div className={styles.row} onClick={onGoToAdmin}>
          Go to Admin
        </div>
      )}
      {user.id.length > 0 && (
        <div className={styles.row} onClick={onLogout}>
          Logout
        </div>
      )}
    </div>
  )
}

export default Card
