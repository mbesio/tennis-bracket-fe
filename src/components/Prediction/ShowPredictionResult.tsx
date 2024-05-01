import React, { useEffect, useState } from 'react'
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

import { useParams } from 'react-router-dom'

import styles from './styles.module.css'

const ShowPredictionResult = () => {
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
    // TO BE UPDATED
    const getUserPrediction = async () => {
      const response = await fetch(
        `${SERVER_DOMAIN}/prediction/tournament/${id}`,
        {
          credentials: 'include',
        },
      )
      const data = await response.json()
      console.log(
        'this should be the user prediction data: ',
        data.data.predictionFirstQuarterSemiFinalist,
      )
      // TO DO - Need to add setPrediction here
      setPrediction({
        [predictionFirstQuarterSemiFinalist]:
          data.data.predictionFirstQuarterSemiFinalist,
        [predictionSecondQuarterSemiFinalist]:
          data.data.predictionSecondQuarterSemiFinalist,
        [predictionThirdQuarterSemiFinalist]:
          data.data.predictionThirdQuarterSemiFinalist,
        [predictionFourthQuarterSemiFinalist]:
          data.data.predictionFourthQuarterSemiFinalist,
        [predictionTopHalfFinalist]: data.data.predictionTopHalfFinalist,
        [predictionBottomHalfFinalist]: data.data.predictionBottomHalfFinalist,
        [predictionWinner]: data.data.predictionWinner,
      })
    }
    getUserPrediction()
  }, [])

  return (
    <div>
      <h3>This will be the Prediciton component</h3>
      <div className={styles.container}>
        <div className={styles.children}>
          <h4>Semifinals</h4>
          <div className={styles.box}>
            {prediction[predictionFirstQuarterSemiFinalist]}
          </div>
          <div className={styles.box}>
            {prediction[predictionSecondQuarterSemiFinalist]}
          </div>
          <div className={styles.box}>
            {prediction[predictionThirdQuarterSemiFinalist]}
          </div>
          <div className={styles.box}>
            {prediction[predictionFourthQuarterSemiFinalist]}
          </div>
        </div>
        <div className={styles.children}>
          <h4>Final</h4>
          <div className={styles.box}>
            {prediction[predictionTopHalfFinalist]}
          </div>
          <div className={styles.box}>
            {prediction[predictionBottomHalfFinalist]}
          </div>
        </div>
        <div className={styles.children}>
          <h4>Winner</h4>
          <div className={styles.box}>{prediction[predictionWinner]}</div>
        </div>
      </div>
    </div>
  )
}

export default ShowPredictionResult
