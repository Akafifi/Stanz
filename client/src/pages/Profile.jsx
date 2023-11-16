import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import Map from '../components/Map'
import { QUERY_SINGLE_PROFILE } from '../utils/queries'
import { DELETE_TOUR } from '../utils/mutations'
import { Carousel } from 'react-bootstrap'

const Profile = () => {
  const { profileId } = useParams()

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
    fetchPolicy: 'cache-and-network',
  })

  const profile = data?.profile || {}
  console.log(profile)

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
      <h1 className="card-header text-center">
        {profile.name}'s searched tours.
      </h1>

      <div
        className="my-4 p-4 text-center"
        style={{ border: '1px dotted #1a1a1a' }}
      >
        <div className="row">
          {profile.tours.map((tour) => {
            return (
              <>
                <div className="col-6 mb-5">
                  <h2 className="">{tour.artist}</h2>
                  <div className="container d-flex flex-column align-items-center">
                    <Map events={tour.stops} />
                  </div>
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
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile
