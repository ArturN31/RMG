'use client';

import { useEffect, useState } from 'react';

export default function WatchlistRuntime() {
	const [watchlistedMovies, setWatchlistedMovies] = useState();

	const getWatchlist = () => {
		const storage = localStorage.getItem('watchlist');
		if (storage) {
			//if watchlist exists in localStorage
			const storageJSON = JSON.parse(storage);
			setWatchlistedMovies(storageJSON.watchlist);
		}
	};

	useEffect(() => {
		getWatchlist();
	}, []);

	const getWatchlistedMoviesRuntime = (movies: any) => {
		if (movies) {
			return movies.map((movie: any) => {
				return parseInt(movie.Runtime.replace(' min', ''));
			});
		}
	};

	const calculateTotalRuntime = (runtimes: number[]) => {
		if (runtimes) {
			return runtimes.reduce((total: number, currentVal: number) => {
				return total + currentVal;
			});
		} else return 0;
	};

	const convertToTime = (runtime: number) => {
		if (runtime && runtime / 60 > 1) {
			if (runtime % 60 === 0) return `${runtime / 60} hrs`;
			if (runtime % 60 !== 0) return `${Math.floor(runtime / 60)} hrs ${runtime % 60} min(s)`;
		}
		if (runtime && runtime / 60 === 1) {
			if (runtime % 60 === 0) return `${runtime / 60} hr`;
			if (runtime % 60 !== 0) return `${Math.floor(runtime / 60)} hr ${runtime % 60} min(s)`;
		}
	};

	const OutputWatchlistRuntime = (movies: any) => {
		if (movies) {
			const allRuntimes = getWatchlistedMoviesRuntime(movies.movies);
			const totalRuntime = calculateTotalRuntime(allRuntimes);
			const runtimeString = convertToTime(totalRuntime);
			return <p id='watchlist-runtime'>Watchlist Runtime: {runtimeString}</p>;
		}
	};

	return <OutputWatchlistRuntime movies={watchlistedMovies} />;
}
