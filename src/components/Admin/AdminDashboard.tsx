import React, { useState, useEffect } from 'react'
import { SERVER_DOMAIN } from '../../constants/constants'
import styles from '../Dashboard/styles.module.css'
import { useNavigate } from 'react-router-dom'

// You should see this page if you are not logged in
const AdminDashboard = () => {
  const [tournamentYears, setTournamentYears] = useState([])
  const navigate = useNavigate()

  const routeChange = (id) => {
    let path = `/admin/tournament/${id}/quarter`
    navigate(path)
  }

  useEffect(() => {
    const getTournamentYears = async () => {
      const response = await fetch(`${SERVER_DOMAIN}/admin/tournaments/year`)
      const data = await response.json()
      console.log('data', data)
      setTournamentYears(data.data)
    }
    getTournamentYears()
  }, [])
  return (
    <div>
      <h3>Admin dashboard</h3>
      <h5>Tournament list</h5>
      {tournamentYears.map(({ id, logo, name, startDate }) => {
        const date = new Date(startDate)
        const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`

        return (
          <div key={id} className={styles.row}>
            <img src={logo} alt={name} className={styles.logo} />

            <button className={styles.name} onClick={() => routeChange(id)}>
              {`${name} - ${formattedDate}`}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default AdminDashboard
