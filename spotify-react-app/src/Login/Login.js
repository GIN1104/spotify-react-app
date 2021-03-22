import React from 'react';
import  './Login.css';
import { loginUrl } from '../spotify';

function Login() {
    return (
        <div className="login">
            <img src="https://radio.wosu.org/sites/wosu2/files/201509/spotify-logo-horizontal-black.jpg" alt="" />
         <a href={ loginUrl } >LOGIN WITH SPOTIFY</a>    
        </div>
    )
}

export default Login
 