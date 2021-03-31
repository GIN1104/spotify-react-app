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
    spotify.setAccessToken(_token);
    dispatch({
      type: 'SET_TOKEN',
      token: _token,
    })
    spotify.getPlaylist("5Oaxjjd52ViyudcRm7f25u").then((res) => 
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: res
      })
      );

    spotify.getMyTopArtists().then((res) => 
       dispatch({
         type: "SET_TOP_ARTISTS",
         top_artists: res
       })
    );

    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify
    })

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
    


  }
}, [token, dispatch]);

console.log("From reducer : ", user)
console.log("Token from reducer : ", token)
  return (
    <div className="app">

      {!token && <Login />}
      {token && <Player spotify={spotify} />}
      {/* {
        token ? ( 
          <Player spotify = { spotify } />
        ) : (
          <Login/>
        )
      } */}
      
    </div>
  );
}

export default App;
