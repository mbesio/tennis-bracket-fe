import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// You should see this page if you are not logged in
import {
  playersFirstQuarter,
  playersSecondQuarter,
  playersThirdQuarter,
  playersFourthQuarter,
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
    </div>
  )
}

export default AdminSelectQuarter
