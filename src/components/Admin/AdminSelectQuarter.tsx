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

  const handleClick = (quarter) => {
    let path = `/admin/tournament/${id}/quarter/${quarter}/add-players`
    navigate(path)

    // your code here
  }
  const quarters = [
    playersFirstQuarter,
    playersSecondQuarter,
    playersThirdQuarter,
    playersFourthQuarter,
  ]
  return (
    <div>
      Select Quarter Page
      {quarters.map((quarter, index) => (
        <button key={index} id={quarter} onClick={() => handleClick(quarter)}>
          {quarter}
        </button>
      ))}
    </div>
  )
}

export default AdminSelectQuarter
