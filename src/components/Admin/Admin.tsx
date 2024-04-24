import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import { SERVER_DOMAIN } from '../../constants/constants'
// NEED TO MAKE SURE THAT ONLY ADMIN USERS CAN ACCESS THIS PAGE

// Admin Component
// Maybe think if possible doing some sort of dropdown table where you add one row at at time
const Admin = () => {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const handleSelectChange = (selectedOption) => {
    console.log('selectedOption: ', selectedOption)
    console.log('selectedPlayers: ', selectedPlayers)
    setSelectedPlayers([...selectedPlayers, selectedOption])
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      // TO DO - Uncommnent once dev is complete
      // const response = await fetch(`${SERVER_DOMAIN}/admin/players`)
      // const data = await response.json()
      // const players = data.data
      const players = [
        { Name: 'N. Djokovic' },
        { Name: 'D. Medvedev' },
        { Name: 'H. Hurkacz' },
      ]
      setPlayers(players)
    }
    fetchPlayers()
  }, [])

  const playerOptions = players.map((player) => ({
    value: player['Name'],
    label: player['Name'],
  }))

  return (
    <div>
      <div>This will be the Admin component</div>

      <Select
        options={playerOptions}
        isSearchable
        onChange={handleSelectChange}
        placeholder={'first-qurter-players'}
        // styles={customStyles}
        isMulti={true}
      />
    </div>
  )
}

export default Admin
