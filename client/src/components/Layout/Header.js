import React from 'react'
import {SpotifyLoginButton, GeniusLoginButton} from '../LoginButtons'

const Header = () => {
    const style = {
        padding: '1rem',
    }
    return (
        <nav className="navbar navbar-collapse-sm justify-content-between" style={style}>
                <h1 className="navbar-brand">Spotify Lyrics</h1>
        </nav>
    )
}

export default Header