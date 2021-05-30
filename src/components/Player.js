import React, {useRef, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
    // State
    const [ songInfo, setSongInfo ] = useState({
        currentTime: 0,
        duration: 0
    });
    // References
    const audioReference = useRef(null);
    // Event handlers
    const playSongHandler = () => {
        if(isPlaying) {
            audioReference.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioReference.current.play();
            setIsPlaying(!isPlaying);
        }     
    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime: current, duration: duration});
    }

    const getTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }

    const dragHandler = (e) => {
        audioReference.current.currentTime = e.target.value;
        setSongInfo({
            ...songInfo,
            currentTime: e.target.value
        });
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    type="range" 
                    min={0} 
                    max={songInfo.duration} 
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x"/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" icon={isPlaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon className="skip-forward" icon={faAngleRight} size="2x"/>
            </div>
            <audio 
            onTimeUpdate={timeUpdateHandler} 
            ref={audioReference} 
            src={currentSong.audio}
            onLoadedMetadata={timeUpdateHandler}
            >
            </audio>
        </div>
    )
}

export default Player;