import React from 'react';
import './Body.css';
import Header from '../Header/Header';
import { useDataLayerValue } from '../DataLayer';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from '../SongRow/SongRow'

function Body({ spotify }) {
    const [{ discover_weekly}, dispatch] = useDataLayerValue();
    console.log(discover_weekly)

    const playPlaylist = () => {
        spotify.play({
            context_uri: 'spotify:playlist:5Oaxjjd52ViyudcRm7f25u'
        }).then(() => {   
            spotify.getMyCurrentPlayingTrack().then((res) => {
                dispatch({
                    type: "SET_ITEM",
                    item: res.item
                });
                dispatch({
                    type: "SET_PLAYING",
                    playing: true
                });
            });
        });
    };

    const playSong = (id) => {
        spotify.play({
            uris: [`spotify:track:${id}`]
        }).then((r) =>{
            console.log("Warning res//////", r)
            spotify.getMyCurrentPlayingTrack().then((res) => {
        
                dispatch({
                    type: "SET_ITEM",
                    item: res.item
                });
                dispatch({
                    type: "SET_PLAYING",
                    playing: true
                })
            })
        })
    }
    return (
        <div className="body">
           <Header spotify={spotify} />
           <div className="body__info">
               <img src={discover_weekly?.images[0].url} alt=""/>

               <div className="body__infoText">
                   <strong>PLAYLIST</strong>
                   <h2>Discover Weekly</h2>
                   <p>{discover_weekly?.name}</p>
                   <p>{discover_weekly?.description}</p>
               </div>
               </div>
               <div className="body__songs">
               <div className="body__icon">
                  <PlayCircleFilledIcon className="body_shuffle" onClick={playPlaylist}/> 
                  <FavoriteIcon fontSize="large" />
                  <MoreHorizIcon />  
                </div>  
                  {discover_weekly?.tracks.items.map((item, i) => 
                      <SongRow key={i} playSong={playSong} track={item.track} />
                  )}  
               </div>
        </div>
    )
}

export default Body
