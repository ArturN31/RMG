'use client';

import Image from 'next/image';
import Watchlist from '../../public/img/watchlist.svg';
import Watchlisted from '../../public/img/watchlisted.svg';
import { useEffect, useState } from 'react';

export default function WatchlistButton(props: any) {
	const { movieState } = props;

	const [isWatchlisted, setIsWatchlisted] = useState<boolean>(false);

	//this function determines if movie is already present in the watchlist
	const isMovieWatchlisted = (movie: any) => {
		const storage = localStorage.getItem('watchlist');
		if (storage) {
			//if watchlist exists in localStorage
			const storageJSON = JSON.parse(storage);
			const watchlist = storageJSON.watchlist;

			//check if the movie is in the watchlist
			const isWatchlisted = watchlist.some((el: any) => el.Title === movie.movieDetails.Title);

			setIsWatchlisted(isWatchlisted);
			return isWatchlisted;
		} else {
			//if watchlist does not exist in localStorage
			setIsWatchlisted(false);
			return false;
		}
	};

	//runs on new movie button press
	useEffect(() => {
		isMovieWatchlisted(movieState);
	}, [movieState]);

	//handles the logic for adding and removing movies from the watchlist in the localStorage
	const handleClick = (movie: any) => {
		//check if movie is already watchlisted
		const isWatchlisted = isMovieWatchlisted(movie);

		if (localStorage.getItem('watchlist') === null) {
			//if watchlist is not in localStorage, create a new watchlist
			const newWatchlist = {
				watchlist: [{ ...movie.movie, ...movie.movieDetails }],
			};
			localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
			setIsWatchlisted(true);
		} else {
			const storage = localStorage.getItem('watchlist');
			if (storage) {
				//if watchlist exists in localStorage
				const storageJSON = JSON.parse(storage);
				const watchlist = storageJSON.watchlist;
				if (isWatchlisted) {
					//if movie is already watchlisted
					if (watchlist.length === 1) {
						//if watchlist has only one movie and the clicked movie is the same, remove the watchlist
						localStorage.removeItem('watchlist');
						setIsWatchlisted(false);
					} else {
						//if watchlist has more than one movie and the clicked movie is in the watchlist, remove the clicked movie
						const updatedWatchlist = watchlist.filter((el: any) => el.Title !== movie.movieDetails.Title);
						const updatedStorage = {
							watchlist: updatedWatchlist,
						};
						localStorage.setItem('watchlist', JSON.stringify(updatedStorage));
						setIsWatchlisted(false);
					}
				} else {
					//if movie is not watchlisted, add it to the watchlist
					const newWatchlist = {
						watchlist: [...watchlist, { ...movie.movie, ...movie.movieDetails }],
					};
					localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
					setIsWatchlisted(true);
				}
			}
		}
	};

	return isWatchlisted === true ? (
		<button>
			<Image
				id='watchlistBtn'
				src={Watchlisted}
				width={40}
				height={40}
				alt='Remove current movie from watchlist.'
				onClick={() => handleClick(movieState)}></Image>
		</button>
	) : (
		<button>
			<Image
				id='watchlistBtn'
				src={Watchlist}
				width={40}
				height={40}
				alt='Add current movie to watchlist.'
				onClick={() => handleClick(movieState)}></Image>
		</button>
	);
}
