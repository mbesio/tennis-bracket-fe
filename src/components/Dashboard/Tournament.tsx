import React, { useState } from 'react'
import styles from './styles.module.css'
import { STATUSES, getText } from '../../helpers/status'
import { hasUserPrediction } from '../../helpers/user'

const Tournament = ({ tournamentid, year, logo, name, status }) => {
  console.log('logo', logo)

  // NEED TO CHECK IF THE USER HAS ALREADY MADE A PREDICTION FOR THIS TOURNAMENT
  const hasPrediction = hasUserPrediction(
    tournamentid,
    year,
    'user from context',
  )
  const text = getText(status, hasPrediction)

  return (
    <div className={styles.row}>
      <img src={logo} alt={name} className={styles.logo} />
      {/* <div className={styles.name}>{name}</div> */}
      <button
        className={styles.name}
        onClick={() => console.log('hi there I have been click, ', name)}
        disabled={status === STATUSES.nonStartedNoDraw}
      >
        {`${name} - ${text}`}
      </button>
    </div>
  )
}

export default Tournament
