import React from 'react'
import Tournament from './Tournament'

// You should see this page only if you are not logged in
const Dashboard = ({ tournaments }) => {
  const currentYear = 2024 // This should be dynamic and come from the backend
  return (
    <div>
      <h1>{currentYear} tournaments</h1>
      {tournaments.map((tournament) => (
        <Tournament
          tournamentid={tournament.tournamentid}
          year={tournament.year}
          logo={tournament.logo}
          name={tournament.name}
          status={tournament.status}
        />
      ))}
    </div>
  )
}

export default Dashboard
