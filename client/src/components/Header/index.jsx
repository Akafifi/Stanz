import { Link } from 'react-router-dom'

import Auth from '../../utils/auth'


const Header = () => {
  let loggedInUserId = "";
  try {
    loggedInUserId = Auth.getProfile()?.data?._id
  } catch (e) {
    console.log("Decode failed!");
  }
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <header className="bg-dark bg-gradient text-light mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-light text-decoration-none" to="/">
          <h1 className="m-0 Got_Heroin" style={{ fontSize: '6rem' }}>
            STANz
          </h1>
        </Link>
        <p
          className="m-0 text-light Got_Heroin"
          style={{ fontSize: '4.75rem', fontWeight: '300' }}
        >
          FoLLOW THE MUSIC
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
