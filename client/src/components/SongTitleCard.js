import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRecordVinyl, faUser} from '@fortawesome/free-solid-svg-icons'


export default function SongTitleCard({song}) {

    const album = song && song.item.album.images[1]
    const artistName = song && song.item.artists[0].name;
    const albumName = song && song.item.album.name
    const songName = song && song.item.name
    const coverImgUrl = album && album.url

    const cardStyle = {
        maxWidth: '25rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '1rem'
    }

    const imgStyle = {
        height: '200px',
        width: '200px',
        alignSelf: 'center',
        marginTop: '20px',
        display: 'block',
        borderRadius: '5px',
    }

    return (
            <div className="card text-white bg-secondary mb-3" style={cardStyle}>
                <div className="card-header" style={{textAlign: 'left'}}>Now Playing</div>
                <img style={imgStyle} src={coverImgUrl} alt="Card image" />
                <div className="card-body">
                    <h5 className="card-title">{songName}</h5>
                    
                    <h6 className="card-subtitle">
                        <FontAwesomeIcon style={{paddingRight: '0.25rem'}} icon={faUser} />
                        {artistName}
                    </h6>
                    
                    <h6 className="card-subtitle" style={{marginTop: '0.3rem'}}>
                        <FontAwesomeIcon style={{paddingRight: '0.25rem'}} icon={faRecordVinyl} />
                        {albumName}
                    </h6>
                </div>
            </div>
    )
}
