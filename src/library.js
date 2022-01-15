import React from 'react';

const LibrarySong = ({ song, setCurrentSong }) => {
	const changeSong = () => {
		setCurrentSong(song);
	};
	return (
		<div className="library_song" onClick={changeSong}>
			<img src={song.cover} />
			<span>{song.name}</span>
		</div>
	);
};

const Library = ({ songs, setCurrentSong }) => {
	return (
		<div className="library_page">
			<div className="library_header">
				<h1>Library</h1>
			</div>
			<div>
				{songs.map((song) => <LibrarySong key={song.name} song={song} setCurrentSong={setCurrentSong} />)}
			</div>
		</div>
	);
};

export default Library;
