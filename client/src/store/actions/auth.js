import types from './actionTypes'
import qs from 'query-string'
import axios from 'axios'

// Handle login response from spotify API
// 
export const spotifyLogin = (hashFragment) => (dispatch) => {
    const spotifyResponse = qs.parse(hashFragment)
    console.log(spotifyResponse)

    if(spotifyResponse.error){
        dispatch({type: types.auth.SPOTIFY_LOGIN_FAILURE})
    } else {
        localStorage.setItem('spotify-auth', JSON.stringify(spotifyResponse))

        dispatch({
            type: types.auth.SPOTIFY_LOGIN_SUCCESS,
            payload: spotifyResponse
        })
    }
}

export const tryLocalSpotifyAuth = () => dispatch => {
    
    const authJSON = localStorage.getItem('spotify-auth')
    
    if (!authJSON) return null

    const spotifyResponse = JSON.parse(authJSON)

    axios
        .get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${spotifyResponse['access_token']}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
        })
        .then(res => {
            if(res.status === 200){
                dispatch({
                    type: types.auth.SPOTIFY_LOGIN_SUCCESS,
                    payload: spotifyResponse
                })
            } else {
                dispatch({type: types.auth.SPOTIFY_LOGIN_FAILURE})
            }
        })
        .catch(err => {
            console.log(err)
            dispatch({type: types.auth.SPOTIFY_LOGIN_FAILURE})
        })

}

export const geniusLogin = (hashFragment) => dispatch => {
    const geniusResponse = qs.parse(hashFragment)
    console.log(geniusResponse)

    if(geniusResponse.error){
        dispatch({type: types.auth.GENIUS_LOGIN_FAILURE})
    } else {
        localStorage.setItem('genius-auth', JSON.stringify(geniusResponse))

        dispatch({
            type: types.auth.GENIUS_LOGIN_SUCCESS,
            payload: geniusResponse
        })
    }
}

export const tryLocalGeniusAuth = () => dispatch => {
    
    const authJSON = localStorage.getItem('genius-auth')
    
    if (!authJSON) return null

    const response = JSON.parse(authJSON)

    axios
        .get(`https://api.genius.com/songs/378195?access_token=${response['access_token']}`)
        .then(res => {
            if(res.status === 200){
                dispatch({
                    type: types.auth.GENIUS_LOGIN_SUCCESS,
                    payload: response
                })
            } else {
                dispatch({type: types.auth.GENIUS_LOGIN_FAILURE})
            }
        })
        .catch(err => {
            console.log(err)
            dispatch({type: types.auth.GENIUS_LOGIN_FAILURE})
        })

}