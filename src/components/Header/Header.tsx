import { useEffect, useState, useContext } from 'react'
import TENNISBALL_ICON_PATH from '../../images/tennisball.png'
import PROFILE_ICON_PATH from '../../images/profile.png'
import LIST_ICON_PATH from '../../images/list.png'
import { UserContext } from '../../context/UserContext'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import Card from './Card'
import { SERVER_DOMAIN } from '../../constants/constants'

const Header = () => {
  const [userLogo, setUserLogo] = useState(PROFILE_ICON_PATH)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.id.length > 0) {
      setUserLogo(user.photo)
    } else {
      setUserLogo(PROFILE_ICON_PATH)
    }
  }, [user])

  const backToDashBoard = () => {
    if (user.id.length > 0) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }

  const goToAdmin = (e) => {
    navigate('/admin')
    setShowUserMenu(!showUserMenu)
    // setUserLogo(PROFILE_ICON_PATH)
  }

  const goToRanking = () => {
    navigate('/rankings')
  }

  const onGoToTournaments = () => {
    navigate('/dashboard')
  }

  const onLogout = async () => {
    try {
      const response = await fetch(`${SERVER_DOMAIN}/auth/logout`, {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('The response from the server was not ok')
      }
      navigate('/')
      setShowUserMenu(false)
      setUser({
        id: '',
        isAdmin: false,
        displayName: '',
        photo: '',
      })
    } catch (error) {
      console.error('There was a problem with the fetch operation', error)
    }
    console.log('clicked logout')
  }

  return (
    <header className={styles.header}>
      <button
        className={[
          styles.container,
          styles.headerButton,
          styles.ovalBorder,
        ].join(' ')}
        onClick={backToDashBoard}
      >
        <img src={TENNISBALL_ICON_PATH} alt="Logo" className={styles.logo} />
        <div>Tennis predictions</div>
      </button>
      <button
        className={[
          styles.container,
          styles.headerButton,
          styles.ovalBorder,
        ].join(' ')}
        onClick={() => {
          if (user && user.id.length > 0) {
            setShowUserMenu(!showUserMenu)
          }
        }}
      >
        <img src={LIST_ICON_PATH} alt="List" className={styles.logoList} />
        <img src={userLogo} alt="User" className={styles.logo} />
      </button>
      {showUserMenu && (
        <div className={styles.cardContainer}>
          <Card
            onLogout={onLogout}
            onGoToAdmin={goToAdmin}
            onGoToTournaments={onGoToTournaments}
            onGoToRanking={goToRanking}
            user={user}
          />
        </div>
      )}
    </header>
  )
}

export default Header
