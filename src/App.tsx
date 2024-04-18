import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'

import logo from './images/AO.png'

const App = () => <div>"Hello World"</div>
// mockdata
const tournamentsMockedData = [
  {
    id: 1,
    year: 2024,
    logo: logo,
    name: 'Australian Open',
    status: 'Completed',
  },
  {
    id: 2,
    year: 2024,
    logo: logo,
    name: 'Indian Wells',
    status: 'Completed',
  },
  {
    id: 3,
    year: 2024,
    logo: logo,
    name: 'Miami Open',
    status: 'In progress',
  },
  {
    id: 4,
    year: 2024,
    logo: logo,
    name: 'Monte Carlo Masters',
    status: 'Non started, draw out',
  },
  {
    id: 5,
    year: 2024,
    logo: logo,
    name: 'Madrid Masters',
    status: 'Non started, no draw',
  },
]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <LandingPage /> */}
    <Dashboard tournaments={tournamentsMockedData} />
  </React.StrictMode>,
)
