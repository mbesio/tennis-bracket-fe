import React, { useEffect, useState } from 'react'
import Tournament from './Tournament'
import { SERVER_DOMAIN } from '../../constants/constants'
import { convertToObject } from 'typescript'

// You should see this page only if you are not logged in
const Dashboard = () => {
  const currentYear = 2024 // This should be dynamic and come from the backend
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    const getUserTournaments = async () => {
      const tournaments = await fetch(`${SERVER_DOMAIN}/tournaments`)
      const data = await tournaments.json()
      setTournaments(data.data)
    }
    getUserTournaments()
  }, [])

  return (
    <div>
      <h1>{currentYear} tournaments</h1>
      {tournaments.map((tournament) => (
        <Tournament
          id={tournament.id}
          year={tournament.year}
          logo={tournament.logo}
          name={tournament.name}
          status={tournament.status}
          startDate={tournament.startDate}
        />
      ))}
    </div>
  )
}

export default Dashboard
