import types from '../actions/actionTypes'

const initialState = {
    spotifyLoggedIn: false,
    spotifyToken: null,
    spotifyExpiry: null,
    geniusLoggedIn: false,
    geniusToken: null,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case types.auth.SPOTIFY_LOGIN_SUCCESS:
            const now = new Date()
            const spotifyExpiry = Math.round(now.getTime()/1000) + parseInt(action.payload['expires_in'])

            return {
                ...state,
                spotifyLoggedIn: true,
                spotifyToken: action.payload['access_token'],
                spotifyExpiry
            }
        case types.auth.SPOTIFY_LOGIN_FAILURE:
            return {
                ...state,
                spotifyLoggedIn: false,
                spotifyToken: null,
                spotifyExpiry: null,
            }
        case types.auth.GENIUS_LOGIN_SUCCESS:
            return {
                ...state,
                geniusLoggedIn: true,
                geniusToken: action.payload['access_token'],
            }
        case types.auth.GENIUS_LOGIN_FAILURE:
            return {
                ...state,
                geniusLoggedIn: false,
                geniusToken: null,
            }

        default:
            return state
    }
}

export default authReducer