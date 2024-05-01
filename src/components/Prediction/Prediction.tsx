import React, { useEffect, useState } from 'react'
import TennisBallIcon from '../../images/tennisball.png'
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

import { useParams, useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

const Prediction = () => {
  const navigate = useNavigate()

  const [firstQuarterOptions, setFirstQuarterOptions] = useState([])
  const [secondQuarterOptions, setSecondQuarterOptions] = useState([])
  const [thirdQuarterOptions, setThirdQuarterOptions] = useState([])
  const [fourthQuarterOptions, setFourthQuarterOptions] = useState([])

  const [prediction, setPrediction] = useState({
    [predictionFirstQuarterSemiFinalist]: '',
    [predictionSecondQuarterSemiFinalist]: '',
    [predictionThirdQuarterSemiFinalist]: '',
    [predictionFourthQuarterSemiFinalist]: '',
    [predictionTopHalfFinalist]: '',
    [predictionBottomHalfFinalist]: '',
    [predictionWinner]: '',
  })

  const { id } = useParams()

  useEffect(() => {
    const getTournamentPlayers = async () => {
      const response = await fetch(
        `${SERVER_DOMAIN}/tournament/players/${id}`,
        {
          credentials: 'include',
        },
      )
      const data = await response.json()

      setFirstQuarterOptions(
        data.data.playersFirstQuarter
          .map((player) => JSON.parse(player))
          .map((player) => ({ value: player.name, seed: player.seed })),
      )
      setSecondQuarterOptions(
        data.data.playersSecondQuarter
          .map((player) => JSON.parse(player))
          .map((player) => ({ value: player.name, seed: player.seed })),
      )
      setThirdQuarterOptions(
        data.data.playersThirdQuarter
          .map((player) => JSON.parse(player))
          .map((player) => ({ value: player.name, seed: player.seed })),
      )
      setFourthQuarterOptions(
        data.data.playersFourthQuarter
          .map((player) => JSON.parse(player))
          .map((player) => ({ value: player.name, seed: player.seed })),
      )
    }
    getTournamentPlayers()
  }, [])

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
            }

            const response = await fetch(
              `${SERVER_DOMAIN}/prediction/tournament/${id}`,
              {
                credentials: 'include',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(predictionSubmission),
              },
            )
            if (response.ok) {
              console.log('Submission successful')
              navigate(`/prediction/result/${id}`)
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
