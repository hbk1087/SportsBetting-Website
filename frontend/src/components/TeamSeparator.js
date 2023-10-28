import atSymbol from '../img/at.png'
import '../css/TeamSeparator.css'

const TeamSeparator = () => {

    return (
        <div className="team-separator">
            <img src={atSymbol} className="at-image"></img>
            <div className="line"></div>
        </div>
    )
}

export default TeamSeparator;