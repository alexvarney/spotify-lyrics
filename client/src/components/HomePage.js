import React, {useEffect, useState, useDebugValue, createContext} from 'react'
import axios from 'axios'
import Layout from './Layout/Layout'
import {connect} from 'react-redux'
import SongDisplay from './SongDisplay'

const useCurrentTrack = auth => {

        const [currentTrack, setCurrentTrack] = useState(null)

        useEffect(() => {
            setInterval(()=>{
                if(auth.spotifyLoggedIn){
                    axios
                    .get('https://api.spotify.com/v1/me/player/currently-playing', {headers: {
                    'Authorization': `Bearer ${auth.spotifyToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',}})
                        .then(res => {
                            if(res.status === 200){
                                if((currentTrack === null) || currentTrack.item.id !== res.data.item.id){
                                    
                                    //Store current track
                                    setCurrentTrack(res.data)
                                }
                            }
                        })
                        .catch(err => console.log(err))
                }
            }, 1000);
    }, [auth.spotifyLoggedIn])

    return currentTrack;

}

const HomePage = ({auth}) => {

    const currentTrack = useCurrentTrack(auth);

    return (
        <Layout>
            <SongDisplay song={currentTrack}/>}
        </Layout>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {})(HomePage)
