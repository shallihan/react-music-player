import React, { useState, useRef }from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Navigation from './components/Navigation';
import data from './data';

import "./styles/app.scss";

function App() {
   // References
  const audioReference = useRef(null);
  // State
  const [ songs, setSongs ] = useState(data());
  const [ currentSong, setCurrentSong ] = useState(songs[0]);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ libraryStatus, setLibraryStatus ] = useState(false);
  const [ songInfo, setSongInfo ] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate animation percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({ 
      ...songInfo, 
      currentTime: current, 
      duration: duration, 
      animationPercentage: animation});
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioReference.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Navigation 
      libraryStatus={libraryStatus}
      setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player 
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioReference={audioReference}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}/>
      <Library  
        libraryStatus={libraryStatus}
        audioReference={audioReference} 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}/>
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        ref={audioReference} 
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}>
      </audio>
    </div>
  );
}

export default App;
