const COMPLETED = 'Completed'
const IN_PROGRESS = 'In progress'
const NON_STARTED_DRAW_OUT = 'Non started, draw out'
const NON_STARTED_NO_DRAW = 'Non started, no draw'

export const STATUSES = {
  completed: COMPLETED,
  inProgress: IN_PROGRESS,
  nonStartedDrawOut: NON_STARTED_DRAW_OUT,
  nonStartedNoDraw: NON_STARTED_NO_DRAW,
}

const COPY_SEE_PAST = 'See past results'
const COPY_SEE_CURRENT = 'View current prediction and results'
const COPY_MAKE_PREDICTION = 'Make a prediction!'
const COPY_VIEW_PREDICTION = 'View a prediction!'
const COPY_VIEW_NO_DRAW = 'Coming soon...'

/**
 *
 * @param status
 * @param hasPrediction
 * @returns
 */
export const getText = (status, hasPrediction) => {
  if (status === STATUSES.completed) {
    return COPY_SEE_PAST
  }
  if (status === STATUSES.inProgress) {
    return COPY_SEE_CURRENT
  }
  if (status === STATUSES.nonStartedDrawOut) {
    return hasPrediction ? COPY_VIEW_PREDICTION : COPY_MAKE_PREDICTION
  }
  if (status === NON_STARTED_NO_DRAW) {
    return COPY_VIEW_NO_DRAW
  }
}
