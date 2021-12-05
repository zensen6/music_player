import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause, faReply } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef } from 'react';

const Song = ({ currentSong, isPlaying, setIsPlaying, setCurrentSong, songs }) => {
	const audioRef = useRef(null);
	const processRef = useRef(0);
	const [ currentState, setCurrentState ] = useState({ time: 0, duration: 0 });
	const [ idx, setIdx ] = useState(0);
	const control = () => {
		if (!isPlaying) {
			audioRef.current.play();
			setIsPlaying(true);
		} else {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};
	const drill = (e) => {
		setCurrentState({ ...currentState, time: e.target.value });
		audioRef.current.currentTime = e.target.value;
	};
	const timeUpdateHandler = (e) => {
		processRef.current.value = e.target.currentTime;
		setCurrentState({ ...currentState, time: e.target.currentTime, duration: audioRef.current.duration });
	};
	const toggleLeft = () => {
		setIdx(idx - 1 < 0 ? songs.length - 1 : idx - 1);
		setIsPlaying(false);
		setCurrentSong(songs[idx]);
	};
	const toggleRight = () => {
		setIdx(idx + 1 == songs.length ? 0 : idx + 1);
		setIsPlaying(false);
		setCurrentSong(songs[idx]);
	};
	const resetsong = () => {
		audioRef.current.currentTime = 0;
		processRef.current.value = 0;
		currentState.time = 0; // 이거 왜 해줘야하는지 모르겠다.
		setCurrentState({ ...currentState, time: 0 });
		console.log(currentState);
	};

	return (
		<div className="song-container">
			<img className="cover" src={currentSong.cover} />
			<p />
			<h1 className="song-name">{currentSong.name}</h1>
			<div className="play">
				<FontAwesomeIcon onClick={toggleLeft} size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon onClick={control} size="2x" icon={isPlaying ? faPause : faPlay} />
				<FontAwesomeIcon onClick={toggleRight} size="2x" icon={faAngleRight} />
			</div>
			<div className="range">
				<input ref={processRef} type="range" onChange={drill} min={0} max={currentState.duration} />
			</div>
			<div className="reply">
				<FontAwesomeIcon onClick={resetsong} size="2x" icon={faReply} />
			</div>
			<audio
				src={currentSong.audio}
				ref={audioRef}
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler} // 맨처음 initial 미디어 로딩시 해주는 일이라 보면 된다.
			/>
		</div>
	);
};

export default Song;
