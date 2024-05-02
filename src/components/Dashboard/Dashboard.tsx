import React, { useEffect, useState } from 'react'
import Tournament from './Tournament'
import { SERVER_DOMAIN } from '../../constants/constants'

// You should see this page only if you are not logged in
const Dashboard = () => {
  const currentYear = 2024 // This should be dynamic and come from the backend
  const [tournaments, setTournaments] = useState([])
  const [userPredictions, setUserPredictions] = useState([])

  useEffect(() => {
    const getUserTournaments = async () => {
      const tournaments = await fetch(`${SERVER_DOMAIN}/tournaments`, {
        credentials: 'include',
      })
      const data = await tournaments.json()
      setTournaments(data.data)
    }
    getUserTournaments()

    const getUserPredictions = async () => {
      const tournaments = await fetch(`${SERVER_DOMAIN}/predictions`, {
        credentials: 'include',
      })
      const data = await tournaments.json()
      setUserPredictions(data.data)
    }
    getUserPredictions()
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
          prediction={userPredictions.find(
            (prediction) => prediction.tournamentYearId === tournament.id,
          )}
        />
      ))}
    </div>
  )
}

export default Dashboard
