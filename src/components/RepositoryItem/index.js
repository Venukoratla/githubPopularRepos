// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {id, name, issuesCount, avatarUrl, forksCount, starsCount} = itemDetails
  return (
    <li key={id} className="list-item">
      <div>
        <img src={avatarUrl} alt={name} className="image" />
        <h1>{name}</h1>
        <div className="small-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="small-image"
          />
          <p>{starsCount} Stars</p>
        </div>
        <div className="small-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="small-image"
          />
          <p>{forksCount} Forks</p>
        </div>
        <div className="small-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="small-image"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
