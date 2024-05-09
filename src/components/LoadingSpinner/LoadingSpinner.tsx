import { FadeLoader } from 'react-spinners'

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <FadeLoader color="black" loading={isLoading} />
    </div>
  )
}

export default LoadingSpinner
