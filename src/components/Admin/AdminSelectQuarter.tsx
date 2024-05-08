import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// You should see this page if you are not logged in
import {
  playersFirstQuarter,
  playersSecondQuarter,
  playersThirdQuarter,
  playersFourthQuarter,
  SERVER_DOMAIN,
} from '../../constants/constants'

const AdminSelectQuarter = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const handleClickAddPlayers = (quarter) => {
    let path = `/admin/tournament/${id}/quarter/${quarter}/add-players`
    navigate(path)
  }

  const handleClickAddResults = () => {
    let path = `/admin/tournament/${id}/add-results`
    navigate(path)
  }

  const handleClickDrawIsAvailable = async () => {
    const response = await fetch(
      `${SERVER_DOMAIN}/admin/tournament/draw-is-open/${id}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (response.ok) {
      console.log('Submission successful')
    } else {
      console.log('Submission failed')
    }
  }

  const handleClickPredictionIsClosed = async () => {
    const response = await fetch(
      `${SERVER_DOMAIN}/admin/tournament/prediction-is-closed/${id}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (response.ok) {
      console.log('Submission successful')
    } else {
      console.log('Submission failed')
    }
  }

  const quarters = [
    playersFirstQuarter,
    playersSecondQuarter,
    playersThirdQuarter,
    playersFourthQuarter,
  ]
  return (
    <div>
      <div>
        Add players based on tournament draw:
        {quarters.map((quarter, index) => (
          <button
            key={index}
            id={quarter}
            onClick={() => handleClickAddPlayers(quarter)}
          >
            {quarter}
          </button>
        ))}
      </div>
      <div>
        Add tournament results:
        <button id={'add-results'} onClick={() => handleClickAddResults()}>
          Add Results
        </button>
      </div>
      <div>
        Open/Close prediction:
        <button
          id={'draw-is-available'}
          onClick={() => handleClickDrawIsAvailable()}
        >
          Draw is available
        </button>
        <button
          id={'prediction-is-closed'}
          onClick={() => handleClickPredictionIsClosed()}
        >
          Prediction is closed
        </button>
      </div>
    </div>
  )
}

export default AdminSelectQuarter
