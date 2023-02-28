// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, updateLangId} = props
  const {id, language} = details
  const changeId = () => {
    updateLangId(id)
  }
  return (
    <li key={id}>
      <div>
        <button type="button" onClick={changeId}>
          {language}
        </button>
      </div>
    </li>
  )
}

export default LanguageFilterItem
