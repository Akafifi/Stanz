import { useLocation, useNavigate } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <footer className="w-100 mt-auto text-light p-2 bg-dark bg-gradient">
      <div className="container text-center mb-1">
        {location.pathname !== '/' && (
          <button className="btn btn-light mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4 className="fs-6">&copy; {new Date().getFullYear()} - Stanz</h4>
      </div>
    </footer>
  )
}

export default Footer
