import React from 'react';

const LibrarySong = ({ song, songs, setCurrentSong, audioReference, isPlaying }) => {

    const songSelectHandler = () => {
        setCurrentSong(song);
        // Check if the song is playing
        if(isPlaying) {
            const playPromise = audioReference.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioReference.current.play();
                })
            }
        }
    };

    return (
        <div onClick={songSelectHandler} className="library-song">
            <img alt={song.name} src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;