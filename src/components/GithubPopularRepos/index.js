import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusConatants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failuer: 'FAILUER',
  initial: 'INITIAL',
}
// Write your code here

class GithubPopularRepos extends Component {
  state = {
    popularReops: [],
    activeItem: languageFiltersData[0].id,
    apiStatus: statusConatants.initial,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeItem} = this.state
    this.setState({apiStatus: statusConatants.loading})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeItem}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        popularReops: updatedData,
        apiStatus: statusConatants.success,
      })
    } else {
      this.setState({apiStatus: statusConatants.failuer})
    }
  }

  updateLangId = activeItem => {
    this.setState({activeItem}, this.getRepos)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} color="#0284c7" />
    </div>
  )

  renderPopularRepos = () => {
    const {popularReops} = this.state
    console.log(popularReops)
    return (
      <div className="main-container">
        <div className="items-container">
          <ul className="items">
            {popularReops.map(eachItem => (
              <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLanguages = () => (
    <div>
      <ul className="language-list">
        {languageFiltersData.map(eachLang => (
          <LanguageFilterItem
            details={eachLang}
            key={eachLang.id}
            updateLangId={this.updateLangId}
          />
        ))}
      </ul>
    </div>
  )

  renderFailuer = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConatants.failuer:
        return this.renderFailuer()
      case statusConatants.success:
        return this.renderPopularRepos()
      case statusConatants.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Popular</h1>
        {this.renderLanguages()}
        {this.renderStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
