import React, { useContext, useEffect, useState } from 'react'
import Tournament from './Tournament'
import { SERVER_DOMAIN } from '../../constants/constants'
import { UserContext } from '../../context/UserContext'
import styles from './styles.module.css'

const Dashboard = () => {
  const currentYear = 2024 // This should be dynamic and come from the backend
  const [tournaments, setTournaments] = useState([])
  const [userPredictions, setUserPredictions] = useState([])
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${SERVER_DOMAIN}/auth/me`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('The response from the server was not ok')
        }
        const data = await response.json()
        setUser(data.data)
      } catch (error) {
        console.error('There was a problem with the fetch operation', error)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const getUserTournaments = async () => {
      try {
        const tournaments = await fetch(`${SERVER_DOMAIN}/tournaments`, {
          credentials: 'include',
        })
        if (!tournaments.ok) {
          throw new Error('The response from the server was not ok')
        }
        const data = await tournaments.json()
        setTournaments(data.data)
      } catch (error) {
        console.error('There was a problem with the fetch operation', error)
      }
    }
    getUserTournaments()

    const getUserPredictions = async () => {
      try {
        const tournaments = await fetch(`${SERVER_DOMAIN}/predictions`, {
          credentials: 'include',
        })
        if (!tournaments.ok) {
          throw new Error('The response from the server was not ok')
        }
        const data = await tournaments.json()
        setUserPredictions(data.data)
      } catch (error) {
        console.error('There was a problem with the fetch operation', error)
      }
    }
    getUserPredictions()
  }, [])

  return (
    <div>
      <h2 className={styles.centered}>{currentYear} tournaments</h2>
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
