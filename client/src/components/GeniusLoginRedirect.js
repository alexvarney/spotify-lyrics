import React from 'react'
import {connect} from 'react-redux'

const GeniusLoginRedirect = ({auth}) => {

    const clientId = process.env.REACT_APP_GENIUS_CLIENT_ID
    const redirectURI = process.env.REACT_APP_GENIUS_REDIRECT_URI
    const scope = 'me'

    const loginURL = `https://api.genius.com/oauth/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}`

    const doRedirect = () => {
        window.location.href = loginURL
    }

    return (
        <div>
            <button className="btn btn-warning" onClick={doRedirect} disabled={auth.geniusLoggedIn}>{(auth.geniusLoggedIn)?'Genius - logged in':'Log in to Genius'}</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {})(GeniusLoginRedirect)