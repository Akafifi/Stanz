import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import Map from '../components/Map'
import { QUERY_SINGLE_PROFILE } from '../utils/queries'
import { DELETE_TOUR } from '../utils/mutations'

const Profile = () => {
  const { profileId } = useParams()

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
  })

  const profile = data?.profile || {}
  // console.log(profile)

  const [deleteTour, { error, loading: deleteTourLoading }] = useMutation(
    DELETE_TOUR,
    {
      refetchQueries: [QUERY_SINGLE_PROFILE, 'profile'],
    },
  )

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="card-header">{profile.name}'s searched tours.</h1>

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        {profile.tours.map((tour) => {
          return (
            <>
              <h2>{tour.artist}</h2>
              <Map events={tour.stops} />
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteTour({
                    variables: {
                      _id: tour._id,
                    },
                  })
                }}
              >
                {deleteTourLoading ? 'Deleting..' : 'Delete'}
              </button>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Profile
