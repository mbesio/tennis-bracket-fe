import React from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import ListIcon from '../../images/list.png'

const BackToDashboardButton = () => {
  const navigate = useNavigate()

  const routeChange = () => {
    let path = `/dashboard`
    navigate(path)
  }

  return (
    <div>
      <button className={styles.backButton} onClick={routeChange}>
        <img src={ListIcon} alt="Tennis Ball Icon" className={styles.icon} />
        Back to Tournaments
      </button>
    </div>
  )
}

export default BackToDashboardButton
