import React, { useContext, useEffect, useState } from 'react'
import Tournament from './Tournament'
import { SERVER_DOMAIN } from '../../constants/constants'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

// You should see this page only if you are not logged in
const Dashboard = () => {
  const currentYear = 2024 // This should be dynamic and come from the backend
  const [tournaments, setTournaments] = useState([])
  const [userPredictions, setUserPredictions] = useState([])
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const routeChange = (id) => {
    let path = `/admin`
    navigate(path)
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${SERVER_DOMAIN}/auth/me`, {
        credentials: 'include',
      })
      const data = await response.json()
      setUser(data.data)
    }
    getUser()
  }, [])

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
      {/* {console.log('user.isAdmin', user.isAdmin)} */}
      {user.isAdmin && <button onClick={routeChange}>Go to Admin</button>}
      <h1>{currentYear} tournaments</h1>
      {tournaments.map((tournament) => (
        <Tournament
          key={tournament.id}
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
