import React, { useState } from 'react'

import Dropdown from './Dropdown'
import {
  predictionFirstQuarterSemiFinalist,
  predictionSecondQuarterSemiFinalist,
  predictionThirdQuarterSemiFinalist,
  predictionFourthQuarterSemiFinalist,
  predictionTopHalfFinalist,
  predictionBottomHalfFinalist,
  predictionWinner,
} from '../../constants/constants'

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
              selection.value ===
              updatedState[predictionThirdQuarterSemiFinalist],
          ) ||
            fourthQuarterOptions.find(
              (selection) =>
                selection.value ===
                updatedState[predictionFourthQuarterSemiFinalist],
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
      <h4>Semifinals</h4>
      <div>
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
      <h4>Final</h4>
      <div>
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
      <h4>Winner</h4>
      <div>
        <Dropdown
          title={'Select Winner'}
          label={predictionWinner}
          options={winner}
          handleChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Prediction
