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
  semifinalistFirstQuarter,
  semifinalistSecondQuarter,
  semifinalistThirdQuarter,
  semifinalistFourthQuarter,
  finalistTopHalf,
  finalistBottomHalf,
  winner,
} from '../../constants/constants'
import { useParams } from 'react-router-dom'
import styles from './styles.module.css'
import BackToDashboardButton from './BackToDashboardButton'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

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

  const [results, setResults] = useState({
    [semifinalistFirstQuarter]: '',
    [semifinalistSecondQuarter]: '',
    [semifinalistThirdQuarter]: '',
    [semifinalistFourthQuarter]: '',
    [finalistTopHalf]: '',
    [finalistBottomHalf]: '',
    [winner]: '',
  })

  const [tournamentName, setTournamentName] = useState('')
  const [tournamentYear, setTournamentYear] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const getUserPrediction = async () => {
      try {
        const response = await fetch(
          `${SERVER_DOMAIN}/prediction/tournament/${id}`,
          {
            credentials: 'include',
          },
        )
        if (!response.ok) {
          throw new Error('The response from the server was not ok')
        }
        const data = await response.json()
        if (data.data) {
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
            [predictionBottomHalfFinalist]:
              data.data.predictionBottomHalfFinalist,
            [predictionWinner]: data.data.predictionWinner,
          })
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation', error)
      }
    }

    const getResults = async () => {
      setIsLoading(true)
      const response = await fetch(`${SERVER_DOMAIN}/result/tournament/${id}`, {
        credentials: 'include',
      })
      const resultData = await response.json()
      if (resultData.data) {
        setTournamentName(resultData.data.name)
        setTournamentYear(resultData.data.year)

        setResults({
          [semifinalistFirstQuarter]:
            JSON.parse(resultData.data.semifinalistFirstQuarter) === null
              ? ''
              : JSON.parse(resultData.data.semifinalistFirstQuarter).name,
          [semifinalistSecondQuarter]:
            JSON.parse(resultData.data.semifinalistSecondQuarter) === null
              ? ''
              : JSON.parse(resultData.data.semifinalistSecondQuarter).name,
          [semifinalistThirdQuarter]:
            JSON.parse(resultData.data.semifinalistThirdQuarter) === null
              ? ''
              : JSON.parse(resultData.data.semifinalistThirdQuarter).name,
          [semifinalistFourthQuarter]:
            JSON.parse(resultData.data.semifinalistFourthQuarter) === null
              ? ''
              : JSON.parse(resultData.data.semifinalistFourthQuarter).name,
          [finalistTopHalf]:
            JSON.parse(resultData.data.finalistTopHalf) === null
              ? ''
              : JSON.parse(resultData.data.finalistTopHalf).name,
          [finalistBottomHalf]:
            JSON.parse(resultData.data.finalistBottomHalf) === null
              ? ''
              : JSON.parse(resultData.data.finalistBottomHalf).name,
          [winner]:
            JSON.parse(resultData.data.winner) === null
              ? ''
              : JSON.parse(resultData.data.winner).name,
        })
      }
      setIsLoading(false)
    }

    getResults()
    getUserPrediction()
  }, [])

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : (
        <div>
          <h3>
            Prediction and results for the {tournamentYear} {tournamentName}
          </h3>
          <h3>Your Prediction</h3>
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
          <h3>Tournament Results</h3>
          <div className={styles.container}>
            <div className={styles.children}>
              <h4>Semifinals</h4>
              <div className={styles.box}>
                {results[semifinalistFirstQuarter]}
              </div>
              <div className={styles.box}>
                {results[semifinalistSecondQuarter]}
              </div>
              <div className={styles.box}>
                {results[semifinalistThirdQuarter]}
              </div>
              <div className={styles.box}>
                {results[semifinalistFourthQuarter]}
              </div>
            </div>
            <div className={styles.children}>
              <h4>Final</h4>
              <div className={styles.box}>{results[finalistTopHalf]}</div>
              <div className={styles.box}>{results[finalistBottomHalf]}</div>
            </div>
            <div className={styles.children}>
              <h4>Winner</h4>
              <div className={styles.box}>{results[winner]}</div>
            </div>
          </div>
          <BackToDashboardButton />
        </div>
      )}
    </div>
  )
}

export default ShowPredictionResult
