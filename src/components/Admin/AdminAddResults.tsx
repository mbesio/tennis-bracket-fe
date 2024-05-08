import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  SERVER_DOMAIN,
  semifinalistFirstQuarter,
  semifinalistSecondQuarter,
  semifinalistThirdQuarter,
  semifinalistFourthQuarter,
  finalistTopHalf,
  finalistBottomHalf,
  winner,
} from '../../constants/constants'
import styles from '../Admin/styles.module.css'
import TennisBallIcon from '../../images/tennisball.png'

const AdminAddResults = () => {
  const { id } = useParams()

  const [selectedPlayers, setSelectedPlayers] = useState({
    [semifinalistFirstQuarter]: null,
    [semifinalistSecondQuarter]: null,
    [semifinalistThirdQuarter]: null,
    [semifinalistFourthQuarter]: null,
    [finalistTopHalf]: null,
    [finalistBottomHalf]: null,
    [winner]: null,
  })

  const SELECT_FORM_LIST = [
    semifinalistFirstQuarter,
    semifinalistSecondQuarter,
    semifinalistThirdQuarter,
    semifinalistFourthQuarter,
    finalistTopHalf,
    finalistBottomHalf,
    winner,
  ]

  return (
    <div>
      {SELECT_FORM_LIST.map((result) => {
        return (
          <div key={result}>
            {result}
            <input
              key={result}
              type="text"
              value={selectedPlayers[result] || ''}
              onChange={(e) =>
                setSelectedPlayers((prevState) => {
                  return {
                    ...prevState,
                    [result]: e.target.value,
                  }
                })
              }
              placeholder="Enter the player as firstname initial dot last name"
            />
          </div>
        )
      })}
      <div>
        <button
          className={styles.submitButton}
          onClick={async (e) => {
            e.preventDefault()
            const submission = {}
            for (const prediction in selectedPlayers) {
              submission[prediction] = {
                name: selectedPlayers[prediction],
                seed: null,
              }
            }
            console.log(' this is the submission object: ', submission)

            const response = await fetch(
              `${SERVER_DOMAIN}/admin/tournament/add-results/${id}`,
              {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(submission),
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
    </div>
  )
}

export default AdminAddResults
