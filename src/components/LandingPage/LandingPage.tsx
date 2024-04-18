import React from 'react'
import styles from './styles.module.css'
import logo from '../../images/tennisball.png'
import GoogleButton from 'react-google-button'

// You should see this page only if you are not logged in
const LandingPage = () => {
  return (
    <div className={styles.container}>
      <h1>Tennis bracket challenge</h1>
      <div>Guess the winners of Slams and Masters 1000 tournaments</div>
      <img
        className={styles.logo}
        src={logo}
        alt="Bracket challenge tennis ball"
      />
      <GoogleButton
        onClick={() => {
          console.log('Google button clicked')
        }}
      />
    </div>
  )
}

export default LandingPage
