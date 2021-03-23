import React from 'react';
import './Player';
import Sidebar from '../Sidebar/Sidebar';
import Body from '../Body/Body'

function Player({ spotify }) {
    return (
        <div className="player">
             <h1>Welcom to Sporify</h1>
            <div className="palayer_body">
                <Sidebar />
                <Body />
            </div>
      {/* Footer */}
           
        </div>
    )
}

export default Player
