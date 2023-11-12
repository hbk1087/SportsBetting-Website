import atSymbol from '../img/at.png'
import '../css/TeamSeparator.css'
import React from 'react';

const TeamSeparator = () => {

    return (
        <div className="team-separator">
            <img src={atSymbol} className="at-image"></img>
            <div className="team-separator-line"></div>
        </div>
    )
}

export default TeamSeparator;