import React from 'react'
import styles from './styles.module.css'
import logo from '../../images/tennisball.png'
import GoogleButton from 'react-google-button'

import { SERVER_DOMAIN } from '../../constants/constants'

// You should see this page if you are not logged in
const LandingPage = () => {
  const GOOGLE_AUTH_URL = `${SERVER_DOMAIN}/auth/google`
  return (
    <div className={styles.container}>
      <h1>Tennis predictions</h1>
      <div>Guess the winners of Slams and Masters 1000 tournaments</div>
      <img
        className={styles.logo}
        src={logo}
        alt="Bracket challenge tennis ball"
      />
      <GoogleButton
        onClick={async () => {
          window.location.href = GOOGLE_AUTH_URL
          // const response = await fetch(GOOGLE_AUTH_URL)
          // const data = await response.json()
          // console.log(data)
        }}
      />
    </div>
  )
}

export default LandingPage
