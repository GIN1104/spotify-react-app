import React, { useEffect,} from 'react';
import './App.css';
import Login from './Login/Login';
import Player from './Player/Player';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {

    // const [token, setToken] = useState(null);
    const [{ user, token }, dispatch] = useDataLayerValue();

useEffect(() => {
  const hash = getTokenFromUrl();
  window.location.hash = "";
  const _token = hash.access_token;

  if(_token){
    dispatch({
      type: 'SET_TOKEN',
      token: _token,
    })
    // setToken(_token);

    spotify.setAccessToken(_token);

    spotify.getMe().then( user => {
      dispatch({
        type: 'SET_USER',
        user: user
      })
    })

    spotify.getUserPlaylists().then((playlists) => {
       dispatch ({
         type: 'SET_PLAYLISTS',
         playlists: playlists
       })
    });
    
    spotify.getPlaylist('3dB3cSEh6k6pyY097OcSLW').then( respons => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: respons,
      })
    })

  }
}, [dispatch]);

console.log("From reducer : ", user)
console.log("Token from reducer : ", token)
  return (
    <div className="app">
      {
        token ? ( 
          <Player spotify = { spotify } />
        ) : (
          <Login/>
        )
      }
      
    </div>
  );
}

export default App;
