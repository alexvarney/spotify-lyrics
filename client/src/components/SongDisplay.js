import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {SpotifyLoginButton, GeniusLoginButton} from './LoginButtons'
import SongTitleCard from './SongTitleCard'
import LyricsCard from './LyricsCard'

const useLyrics = (song, auth) => {

    const [lyrics, setLyrics] = useState(null)
    const [prevSongId, setPrevSongId] = useState(null)
    const [isLyricsLoading, setLyricsLoading] = useState(false);

    //Effect runs when song changes to update document title and fetch the lyrics 
    useEffect(() => {
        if (auth && auth.geniusToken && song && song.item.id !== prevSongId){
            setLyricsLoading(true);

            document.title = `Spotify Lyrics | ${song.item.name} - ${song.item.artists[0].name}`

            axios.get(`https://api.genius.com/search?q=${song.item.name}-${song.item.artists[0].name}&access_token=${auth.geniusToken}`)
            .then((res)=>{
                
                if (res.data.meta.status === 200){
                    setPrevSongId(song.item.id)
                    if(res.data.response.hits[0] && res.data.response.hits[0].result){
                        //Make request to backend service to search for genius lyrics
                        const url = `/api/lyrics/${res.data.response.hits[0].result.id}?genius_token=${auth.geniusToken}`
                        axios.get(url)
                        .then(res => {
                            setLyrics(res.data)
                            setLyricsLoading(false)
                        })
                    } else {
                        setLyrics('No results found for this track')
                        setLyricsLoading(false)
                    }
                }
            })
        }
    }, [song, auth])

    return {
        isLyricsLoading,
        lyrics
    }

}

const SongDisplay = ({song, auth}) => {

    const lyrics = useLyrics(song, auth);

    return (
        <div style={{textAlign: 'center'}}>

            {auth.spotifyLoggedIn ? 
            <> 
                <SongTitleCard song={song} />
            </> : 
            <> 
                <SpotifyLoginButton />
            </>}

            {auth.geniusLoggedIn ? 
            <> 
                {
                    <LyricsCard lyrics={lyrics} />
                }
            </> : 
            <> 
                <GeniusLoginButton />
            </>}
        </div>
    )
}

const mapPropsToState = (state) => ({
    auth: state.auth
})

export default connect(mapPropsToState, {})(SongDisplay);