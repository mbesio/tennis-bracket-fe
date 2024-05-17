import React, { useEffect, useState } from 'react'
import { SERVER_DOMAIN } from '../../constants/constants'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import styles from './styles.module.css'
import ReactPaginate from 'react-paginate'

const Rankings = () => {
  type UserDetails = {
    numberOfPredictions: number
    totalScore: number
    rank: number
    user: {
      displayName: string
      photo: string
    }
  }
  const [page, setPage] = useState(1)
  const [overallRanking, setOverallRanking] = useState([])
  const [userDetails, setUserDetails] = useState({} as UserDetails)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isUserRankLowerThanMinRank, setIsUserRankLowerThanMinRank] =
    useState(false)
  const [isUserRankLargerThanMaxRank, setIsUserRankLargerThanMaxRank] =
    useState(false)

  useEffect(() => {
    const getRankings = async () => {
      try {
        setIsLoading(true)
        const params = new URLSearchParams({ page: page.toString() })

        const response = await fetch(
          `${SERVER_DOMAIN}/ranking?${params.toString()}`,
          {
            credentials: 'include',
          },
        )
        if (!response.ok) {
          throw new Error('The response from the server was not ok')
        }
        const data = await response.json()

        setUserDetails(data?.data?.userDetails ?? {})
        setOverallRanking(data?.data?.overallRanking ?? [])
        setTotalPages(data?.data?.totalPages ?? 1)

        // console.log('data.data.overallRanking ', data.data.overallRanking)

        const minRanking = data.data.overallRanking[0].rank
        const maxRanking =
          data.data.overallRanking[data.data.overallRanking.length - 1].rank
        const userRanking = data.data.userDetails.rank

        setIsUserRankLowerThanMinRank(userRanking < minRanking)
        setIsUserRankLargerThanMaxRank(userRanking > maxRanking)
      } catch (error) {
        console.error('There was a problem with the fetch operation', error)
      }
      setIsLoading(false)
    }
    getRankings()
  }, [page])

  const handlePageClick = (e) => {
    setPage(e.selected + 1)
  }

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : (
        <div>
          <h2>Rankings</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.rankingColumn}></th>
                <th className={styles.avatarColumn}></th>
                <th className={styles.nameColumn}></th>
                <th className={styles.scoreColumn}>Score</th>
                <th className={styles.predictionsColumn}># of Predictions</th>
              </tr>
            </thead>
            <tbody>
              {isUserRankLowerThanMinRank && (
                <tr key={userDetails.rank}>
                  <td>{userDetails.rank}</td>
                  <td>
                    <img
                      src={userDetails.user.photo}
                      alt={userDetails.user.displayName}
                      className={styles.avatar}
                    />
                  </td>
                  <td>{userDetails.user.displayName}</td>
                  <td>{userDetails.totalScore}</td>
                  <td>{userDetails.numberOfPredictions}</td>
                </tr>
              )}
              {overallRanking.map((player) => (
                <tr
                  key={player.rank}
                  className={
                    player.rank === userDetails.rank ? styles.grayRow : ''
                  }
                >
                  <td>{player.rank}</td>
                  <td>
                    <img
                      src={player.user.photo}
                      alt={player.user.displayName}
                      className={styles.avatar}
                    />
                  </td>
                  <td>{player.user.displayName}</td>
                  <td>{player.totalScore}</td>
                  <td>{player.numberOfPredictions}</td>
                </tr>
              ))}
              {isUserRankLargerThanMaxRank && (
                <tr key={userDetails.rank}>
                  <td>{userDetails.rank}</td>
                  <td>
                    <img
                      src={userDetails.user.photo}
                      alt={userDetails.user.displayName}
                      className={styles.avatar}
                    />
                  </td>
                  <td>{userDetails.user.displayName}</td>
                  <td>{userDetails.totalScore}</td>
                  <td>{userDetails.numberOfPredictions}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={styles.paginationContainer}>
            <ReactPaginate
              containerClassName={styles.pagination}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="<"
              nextLabel=">"
              pageClassName="page-item"
              breakLabel="..."
              activeClassName={styles.active}
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Rankings
