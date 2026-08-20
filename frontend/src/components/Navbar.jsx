import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/UseLogout'
import { useAuthContext } from '../hooks/UserAuthContext'



const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <div className="navbar">
      <header>
        <div className="container">
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>

          <nav>
            {
              user && (
                <div>
                  <span>{user.username}</span>
                  <button onClick={handleClick}>Log Out</button>
                </div>
              )
            }
            {
              !user && (
                <div>
                  <Link to="/login"> Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>

              )
            }
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Navbar
