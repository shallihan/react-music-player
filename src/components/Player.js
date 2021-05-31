import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { playAudio } from '../util';

const Player = ({ songs, setSongs, setCurrentSong, currentSong, isPlaying, setIsPlaying, audioReference, songInfo, setSongInfo }) => {
    // Event handlers
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        });
        setSongs(newSongs);
    }, [currentSong]);

    const playSongHandler = () => {
        if (isPlaying) {
            audioReference.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioReference.current.play();
            setIsPlaying(!isPlaying);
        }     
    };

    const getTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    };

    const dragHandler = (e) => {
        audioReference.current.currentTime = e.target.value;
        setSongInfo({
            ...songInfo,
            currentTime: e.target.value
        });
    };

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        } 
        if(direction === 'skip-back') {
            if((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length -1]);
                playAudio(isPlaying, audioReference);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying, audioReference);
    };

    // Add styles 
    const trackAnim =  {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`, }} className="track">
                    <input 
                        type="range" 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')} 
                    className="skip-back" 
                    icon={faAngleLeft} 
                    size="2x"/>
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    icon={isPlaying ? faPause : faPlay} 
                    size="2x"/>
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-forward')} 
                    className="skip-forward" 
                    icon={faAngleRight} 
                    size="2x"/>
            </div>
        </div>
    )
}

export default Player;