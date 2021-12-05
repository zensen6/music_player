import React, { useState } from 'react';
import Song from './Song';
import './styles/app.scss';
import data from './utils.js';

function App() {
	const [ songs, setSongs ] = useState(data());
	const [ currentSong, setCurrentSong ] = useState(songs[0]);
	const [ isPlaying, setIsPlaying ] = useState(false);

	return (
		<div className="App">
			<Song
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				songs={songs}
			/>
		</div>
	);
}

export default App;
