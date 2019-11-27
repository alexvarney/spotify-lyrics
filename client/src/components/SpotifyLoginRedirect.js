import React from 'react'
import {connect} from 'react-redux'

const SpotifyLoginRedirect = ({auth}) => {

    const spotifyClientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const redirectURI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI
    const scope = 'user-read-playback-state'

    const loginURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${spotifyClientId}&redirect_uri=${redirectURI}&scope=${scope}`

    const doRedirect = () => {
        window.location.href = loginURL
    }

    return (
        <div>
            <button className="btn btn-success" onClick={doRedirect} disabled={auth.spotifyLoggedIn}>{(auth.spotifyLoggedIn)?'Spotify Logged in':'Log in to Spotify'}</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {})(SpotifyLoginRedirect)
