import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const buttonStyle = {
    margin: '0.5rem',
}

export const GeniusLoginButton = connect(mapStateToProps, {})(
    ({auth}) => {

        const clientId = process.env.REACT_APP_GENIUS_CLIENT_ID
        const redirectURI = process.env.REACT_APP_GENIUS_REDIRECT_URI
        const scope = 'me'

        const loginURL = `https://api.genius.com/oauth/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}`

        const doRedirect = () => {
            window.location.href = loginURL
        }

        return (
            <button style={buttonStyle} className="btn btn-warning" onClick={doRedirect} disabled={auth.geniusLoggedIn}>{(auth.geniusLoggedIn)?'Genius Connected':'Log in to Genius'}</button>
        )
    }
)

export const SpotifyLoginButton = connect(mapStateToProps, {})(
    ({auth}) => {

        const spotifyClientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
        const redirectURI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI
        const scope = 'user-read-playback-state'

        const loginURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${spotifyClientId}&redirect_uri=${redirectURI}&scope=${scope}`

        const doRedirect = () => {
            window.location.href = loginURL
        }

        return (
                <button style={buttonStyle} className="btn btn-success" onClick={doRedirect} disabled={auth.spotifyLoggedIn}>{(auth.spotifyLoggedIn)?'Spotify Connected':'Log in to Spotify'}</button>
        )
    }
)