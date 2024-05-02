const mockUserObject = {
  user: {
    predictions: [
      {
        tournamentId: 1,
        year: 2024,
        prediction: {
          semifinalistFirstQuarter: 'Roger Federer',
          semifinalistSecondQuarter: 'Rafael Nadal',
          semifinalistThirdQuarter: 'Novak Djokovic',
          semifinalistFourthQuarter: 'Andy Murray',
          finalistTopHalf: 'Roger Federer',
          finalistBottomHalf: 'Novak Djokovic',
          winner: 'Roger Federer',
        },
      },
    ],
  },
}
/**
 * Checks if a user has made a prediction for a tournament
 * @param tournamentId
 * @param year
 * @param user
 * @returns boolean - true if user has prediction for the tournament, false otherwise
 */
export const hasUserPrediction = (prediction) =>
  prediction === undefined ? false : true
