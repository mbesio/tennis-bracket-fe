import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import { SERVER_DOMAIN } from '../../constants/constants'

import styles from './styles.module.css'
import TennisBallIcon from '../../images/tennisball.png'

import { useParams } from 'react-router-dom'
// NEED TO MAKE SURE THAT ONLY ADMIN USERS CAN ACCESS THIS PAGE
// Admin Component
type PlayerOption = {
  value: string
  label: string
}

type SeedOption = {
  value: number | null
  label: string | null
}

const AdminAddPlayers = () => {
  const { quarter, id } = useParams()
  const [availablePlayers, setAvailablePlayers] = useState([])
  const [availableSeeds, setAvailableSeeds] = useState([
    { value: null, label: null },
    ...Array.from({ length: 32 }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}`,
    })),
  ])

  const [selectedPlayers, setSelectedPlayers] = useState([])

  const [currentPlayer, setCurrentPlayer] = useState<PlayerOption>(null)
  const [currentSeed, setCurrentSeed] = useState<SeedOption>(null)

  const handlePlayerChange = (selectedOption) => {
    setCurrentPlayer(selectedOption)
  }

  const handleSeedChange = (selectedOption) => {
    setCurrentSeed(selectedOption)
  }

  const addPlayer = () => {
    const newSelectedPlayers = [...selectedPlayers]
    setSelectedPlayers([
      ...newSelectedPlayers,
      { name: currentPlayer.value, seed: currentSeed?.value || null },
    ])

    const remainingPlayers = availablePlayers.filter(
      (player) => player.value !== currentPlayer.value,
    )
    setAvailablePlayers(remainingPlayers)

    if (currentSeed) {
      const remainingSeeds = availableSeeds.filter(
        (seed) => seed.value !== currentSeed.value,
      )
      setAvailableSeeds(remainingSeeds)
    }

    setCurrentPlayer(null)
    setCurrentSeed(null)
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${SERVER_DOMAIN}/admin/players`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('The response from the server was not ok')
        }
        const data = await response.json()
        const players = data.data

        const playerOptions = players.map((player) => ({
          value: player['Name'],
          label: player['Name'],
        }))
        setAvailablePlayers(playerOptions)
      } catch (error) {
        console.error('There was a problem with the fetch operation', error)
      }
    }
    fetchPlayers()
  }, [])

  return (
    <div>
      <div>Add players - {quarter}</div>
      <div>
        {selectedPlayers.map((selectedPlayer) => (
          <div key={selectedPlayer.name} className={styles.container}>
            <Select
              placeholder={selectedPlayer.name}
              styles={{ container: (provided) => ({ ...provided, flex: 3 }) }}
              isDisabled={true}
            />

            <Select
              placeholder={selectedPlayer.seed || 'None'}
              styles={{ container: (provided) => ({ ...provided, flex: 1 }) }}
              isDisabled={true}
            />
            <button className={styles.button} onClick={addPlayer}>
              Add player{' '}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.container}>
        <Select
          options={availablePlayers}
          value={currentPlayer}
          onChange={(option) => handlePlayerChange(option)}
          placeholder={quarter}
          styles={{ container: (provided) => ({ ...provided, flex: 3 }) }}
        />
        <Select
          options={availableSeeds}
          value={currentSeed}
          onChange={(option) => handleSeedChange(option)}
          placeholder={'seed'}
          styles={{ container: (provided) => ({ ...provided, flex: 1 }) }}
        />
        <button onClick={addPlayer}>Add player </button>
      </div>
      {/* ADD BUTTON TO SUBMIT TO THE BE */}
      <button
        className={styles.submitButton}
        onClick={async (e) => {
          e.preventDefault()
          const predictionSubmission = {
            [quarter]: selectedPlayers,
          }
          const response = await fetch(
            `${SERVER_DOMAIN}/admin/tournament/add-draw-players/${id}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(predictionSubmission),
            },
          )
          if (response.ok) {
            console.log('Submission successful')
          } else {
            console.log('Submission failed')
          }
        }}
      >
        <img
          src={TennisBallIcon}
          alt="Tennis Ball Icon"
          className={styles.icon}
        />
        Submit Players
      </button>
    </div>
  )
}

export default AdminAddPlayers
