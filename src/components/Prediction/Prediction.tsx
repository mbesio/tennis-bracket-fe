import React, { useState } from 'react'
import TennisBallIcon from '../../images/tennisball.png' // adjust the path as needed
import Dropdown from './Dropdown'
import {
  predictionFirstQuarterSemiFinalist,
  predictionSecondQuarterSemiFinalist,
  predictionThirdQuarterSemiFinalist,
  predictionFourthQuarterSemiFinalist,
  predictionTopHalfFinalist,
  predictionBottomHalfFinalist,
  predictionWinner,
  SERVER_DOMAIN,
} from '../../constants/constants'

import styles from './styles.module.css'

// Add a use effect to call these from the backend
const firstQuarterOptions = [
  { value: 'Matteo Berrettini', seed: 1 },
  { value: 'Sasha Zverev', seed: 2 },
]

// Add a use effect to call these from the backend
const secondQuarterOptions = [
  { value: 'Alex De Minaur', seed: null },
  { value: 'Ben Shelton', seed: 15 },
]

const thirdQuarterOptions = [
  { value: 'Andy Murray', seed: null },
  { value: 'Stan Wawrinka', seed: null },
]
const fourthQuarterOptions = [
  { value: 'Rafa Nadal', seed: 17 },
  { value: 'Roger Federer', seed: 3 },
]

// You should see this page only if you are not logged in
const Prediction = () => {
  const [prediction, setPrediction] = useState({
    [predictionFirstQuarterSemiFinalist]: '',
    [predictionSecondQuarterSemiFinalist]: '',
    [predictionThirdQuarterSemiFinalist]: '',
    [predictionFourthQuarterSemiFinalist]: '',
    [predictionTopHalfFinalist]: '',
    [predictionBottomHalfFinalist]: '',
    [predictionWinner]: '',
  })
  const [topHalfFinalist, setTopHalfFinalist] = useState([])
  const [bottomHalfFinalist, setBottomHalfFinalist] = useState([])
  const [winner, setWinner] = useState([])

  const handleChange = (event, label) => {
    setPrediction((prevState) => {
      const updatedState = {
        ...prevState,
        [label]: event.target.value,
      }

      if (
        updatedState[predictionFirstQuarterSemiFinalist] &&
        updatedState[predictionSecondQuarterSemiFinalist]
      ) {
        setTopHalfFinalist([
          firstQuarterOptions.find(
            (selection) =>
              selection.value ===
              updatedState[predictionFirstQuarterSemiFinalist],
          ),
          secondQuarterOptions.find(
            (selection) =>
              selection.value ===
              updatedState[predictionSecondQuarterSemiFinalist],
          ),
        ])
      } else {
        setTopHalfFinalist([])
      }

      if (
        updatedState[predictionThirdQuarterSemiFinalist] &&
        updatedState[predictionFourthQuarterSemiFinalist]
      ) {
        setBottomHalfFinalist([
          thirdQuarterOptions.find(
            (selection) =>
              selection.value ===
              updatedState[predictionThirdQuarterSemiFinalist],
          ),
          fourthQuarterOptions.find(
            (selection) =>
              selection.value ===
              updatedState[predictionFourthQuarterSemiFinalist],
          ),
        ])
      } else {
        setBottomHalfFinalist([])
      }

      if (
        updatedState[predictionTopHalfFinalist] &&
        updatedState[predictionBottomHalfFinalist]
      ) {
        setWinner([
          firstQuarterOptions.find(
            (selection) =>
              selection.value === updatedState[predictionTopHalfFinalist],
          ) ||
            secondQuarterOptions.find(
              (selection) =>
                selection.value === updatedState[predictionTopHalfFinalist],
            ),
          thirdQuarterOptions.find(
            (selection) =>
              selection.value === updatedState[predictionBottomHalfFinalist],
          ) ||
            fourthQuarterOptions.find(
              (selection) =>
                selection.value === updatedState[predictionBottomHalfFinalist],
            ),
        ])
      } else {
        setWinner([])
      }

      return updatedState
    })
  }

  return (
    <div>
      <h3>This will be the Prediciton component</h3>
      <div className={styles.container}>
        <div className={styles.children}>
          <h4>Semifinals</h4>
          <Dropdown
            title={'Select First Quarter Semifinalist'}
            label={predictionFirstQuarterSemiFinalist}
            options={firstQuarterOptions}
            handleChange={handleChange}
          />
          <Dropdown
            title={'Select Second Quarter Semifinalist'}
            label={predictionSecondQuarterSemiFinalist}
            options={secondQuarterOptions}
            handleChange={handleChange}
          />
          <Dropdown
            title={'Select Third Quarter Semifinalist'}
            label={predictionThirdQuarterSemiFinalist}
            options={thirdQuarterOptions}
            handleChange={handleChange}
          />
          <Dropdown
            title={'Select Fourth Quarter Semifinalist'}
            label={predictionFourthQuarterSemiFinalist}
            options={fourthQuarterOptions}
            handleChange={handleChange}
          />
        </div>
        <div className={styles.children}>
          <h4>Final</h4>
          <Dropdown
            title={'Select Top Half Finalist'}
            label={predictionTopHalfFinalist}
            options={topHalfFinalist}
            handleChange={handleChange}
          />
          <Dropdown
            title={'Select Bottom Half Finalist'}
            label={predictionBottomHalfFinalist}
            options={bottomHalfFinalist}
            handleChange={handleChange}
          />
        </div>
        <div className={styles.children}>
          <h4>Winner</h4>
          <Dropdown
            title={'Select Winner'}
            label={predictionWinner}
            options={winner}
            handleChange={handleChange}
          />
        </div>
      </div>
      <button
        className={styles.submitButton}
        onClick={async (e) => {
          e.preventDefault()
          console.log(
            'predictionFirstQuarterSemiFinalist ',
            predictionFirstQuarterSemiFinalist,
          )
          if (
            prediction[predictionFirstQuarterSemiFinalist] &&
            prediction[predictionSecondQuarterSemiFinalist] &&
            prediction[predictionThirdQuarterSemiFinalist] &&
            prediction[predictionFourthQuarterSemiFinalist] &&
            prediction[predictionTopHalfFinalist] &&
            prediction[predictionBottomHalfFinalist] &&
            prediction[predictionWinner]
          ) {
            console.log('the prediction has been submitted')
            // send the submission to the backend and send the user to the bracket page

            const predictionSubmission = {
              ...prediction,
              userId: '110467087751500234185', // TO DO get the user id from the context
            }
            // this I will extract from the url
            const id = '4edbeb00-8b5a-42a7-a1e2-e692523341df'
            const year = '2024'

            const response = await fetch(
              `${SERVER_DOMAIN}/prediction/tournament/${id}/${year}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(predictionSubmission),
              },
            )
            if (response.ok) {
              console.log('Submission successful')
              // send the user to the bracket page
            } else {
              console.log('Submission failed')
            }
          } else {
            console.log('Please fill out all fields')
            // display the error message, if any
          }
        }}
      >
        <img
          src={TennisBallIcon}
          alt="Tennis Ball Icon"
          className={styles.icon}
        />
        Make your Prediction
      </button>
    </div>
  )
}

export default Prediction
