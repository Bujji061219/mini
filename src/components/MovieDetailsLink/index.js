import {Link} from 'react-router-dom'

import './index.css'

const MovieDetailsLink = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails

  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img
          src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1662296727/Movies_Logo_vr3wvf.png"
          alt={title}
          className="popular-img"
        />
      </li>
    </Link>
  )
}

export default MovieDetailsLink
