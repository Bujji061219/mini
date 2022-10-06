import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

import Header from '../Header'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import LoadingView from '../LoadingView'
import FooterSection from '../FooterSection'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    randomHomePagePoster: {},
  }

  componentDidMount() {
    this.getRandomHomePagePoster()
  }

  getRandomHomePagePoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const homeApi = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(homeApi, options)

    if (response.ok === true) {
      const homePageData = await response.json()
      const lengthOfData = homePageData.results.length
      const randomPoster =
        homePageData.results[Math.floor(Math.random() * lengthOfData)]

      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }
      this.setState({
        randomHomePagePoster: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoaderView = () => <LoadingView />

  renderSuccessView = () => {
    const {randomHomePagePoster} = this.state
    const {title, backdropPath, overview} = randomHomePagePoster

    return (
      <div
        style={{backgroundImage: `url(${backdropPath})`}}
        className="home-page"
      >
        <Header />

        <div className="home-page-movie-container">
          <h1 className="movie-title">{title}</h1>
          <h1 className="over-view">{overview}</h1>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderhomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="bg-container">
          {this.renderhomePage()}

          <h1 className="side-heading">Trending Now</h1>
          <TrendingNow />
          <h1 className="side-heading">Originals</h1>
          <Originals />
          <FooterSection />
        </div>
      </>
    )
  }
}
export default Home
