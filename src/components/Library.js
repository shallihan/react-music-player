import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, audioReference, isPlaying, setSongs, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                <LibrarySong 
                audioReference={audioReference} 
                song={song} 
                songs={songs} 
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying} 
                setSongs={setSongs}
                id={song.id}/>
                )}
            </div>
        </div>
    )

};

export default Library;