import React from 'react'

export default function LyricsCard({lyrics}) {
    const cardStyle = {
        maxWidth: '25rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '1rem'
    }

    const pStyle = {
        whiteSpace: 'pre-wrap',
        fontSize: '16px',
    }
    
    return (
        <div className="card mb-3" style={cardStyle}>
            <div className="card-header" style={{textAlign: 'left'}}>Lyrics</div>
            <div className="card-body">
                {lyrics.isLyricsLoading ?                         
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>  
                : 
                    <p style={pStyle}>{lyrics.lyrics}</p> 
                }
            </div>
        </div>
    )
}
