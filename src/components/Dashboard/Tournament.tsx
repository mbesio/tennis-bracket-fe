import React, { useState } from 'react'
import styles from './styles.module.css'
import { STATUSES, getText } from '../../helpers/status'
import { hasUserPrediction } from '../../helpers/user'
import { useNavigate } from 'react-router-dom'

const Tournament = ({
  id,
  year,
  logo,
  name,
  status,
  startDate,
  prediction,
}) => {
  const navigate = useNavigate()

  const gotoMakePrecition = () => {
    let path = `/prediction/${id}`
    navigate(path)
  }
  const gotoViewPrecitionAndResult = () => {
    let path = `/prediction/result/${id}`
    navigate(path)
  }
  // NEED TO CHECK IF THE USER HAS ALREADY MADE A PREDICTION FOR THIS TOURNAMENT
  const hasPrediction = hasUserPrediction(prediction)
  const text = getText(status, hasPrediction)
  // Create a new Date object from the ISO date string
  const date = new Date(startDate)

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className={styles.row}>
      <img src={logo} alt={name} className={styles.logo} />
      <button
        className={styles.name}
        onClick={() => {
          if (status === STATUSES.nonStartedDrawOut) {
            if (!hasPrediction) {
              gotoMakePrecition()
            } else {
              gotoViewPrecitionAndResult()
            }
          }
          if (status === STATUSES.completed || status === STATUSES.inProgress) {
            gotoViewPrecitionAndResult()
          }
        }}
        disabled={status === STATUSES.nonStartedNoDraw}
      >
        {`${name} - ${formattedDate} - ${text}`}
      </button>
    </div>
  )
}

export default Tournament
