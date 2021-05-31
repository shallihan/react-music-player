import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, audioReference, isPlaying }) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                <LibrarySong 
                audioReference={audioReference} 
                song={song} 
                songs={songs} 
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying} />
                )}
            </div>
        </div>
    )

};

export default Library;