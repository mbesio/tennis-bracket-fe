import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './components/LandingPage/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'
import Prediction from './components/Prediction/Prediction'
import Bracket from './components/Bracket/Bracket'
import AdminDashboard from './components/Admin/AdminDashboard'
import logo from './images/AO.png'
import AdminAddPlayers from './components/Admin/AdminAddPlayers'
import AdminSelectQuarter from './components/Admin/AdminSelectQuarter'
import ShowPredictionResult from './components/Prediction/ShowPredictionResult'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'
import AdminRoutes from './components/PrivateRoutes/AdminRoutes'
import UserContextProvider from './context/UserContext'

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/prediction/:id" element={<Prediction />} />
              <Route
                path="/prediction/result/:id"
                element={<ShowPredictionResult />}
              />
            </Route>
            <Route path="/bracket/:year/:tournament" element={<Bracket />} />
            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/admin/tournament/:id/quarter/:quarter/add-players"
                element={<AdminAddPlayers />}
              />
              <Route
                path="/admin/tournament/:id/quarter"
                element={<AdminSelectQuarter />}
              />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}
// mockdata
const tournamentsMockedData = [
  {
    id: 1,
    year: 2024,
    logo: 'https://storage.cloud.google.com/tennis-logos/IW.png',
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
root.render(<App />)
