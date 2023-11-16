import { Link } from 'react-router-dom'

import Auth from '../../utils/auth'

const Header = () => {
  const loggedInUserId = Auth.getProfile()?.data?._id
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <header className="bg-success bg-gradient text-light mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-light text-decoration-none" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            Stanz
          </h1>
        </Link>
        <p
          className="m-0 text-dark"
          style={{ fontSize: '1.75rem', fontWeight: '700' }}
        >
          Follow the Music
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link
                className="btn btn-md btn-secondary m-2"
                to={`/profiles/${loggedInUserId}`}
              >
                Profile
              </Link>
              <button className="btn btn-md btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-md btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-md btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
