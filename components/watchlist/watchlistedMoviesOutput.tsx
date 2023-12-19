'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import imgNotAvailable from '../../public/img/Image_not_available.png';
import { useRouter } from 'next/navigation';

export default function WatchlistedMoviesOutput() {
	const [watchlistedMovies, setWatchlistedMovies] = useState();

	const { push } = useRouter();

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

	const MoviesOutput = (movies: any) => {
		if (movies && movies.movies) {
			const list = movies.movies;
			return (
				<div id='movies-section'>
					{list.map((movie: any) => (
						<MovieDetails
							key={movie.Title}
							movie={movie}
						/>
					))}
				</div>
			);
		}
	};

	const handleMovieClick = (movie: any) => {
		push(`/watchlist/movie?id=${movie.id}`);
	};

	const MovieDetails = (movie: any) => {
		const { Title, primaryImage } = movie.movie;
		return (
			<div
				id='movie-container'
				onClick={() => {
					handleMovieClick(movie.movie);
				}}>
				{/* Poster */}
				{primaryImage && primaryImage.url ? (
					<Image
						priority
						id='poster'
						src={primaryImage.url}
						alt={primaryImage.caption.plainText}
						width={primaryImage.width}
						height={primaryImage.height}
					/>
				) : (
					<div id='no-poster-container'>
						<Image
							id='no-poster'
							src={imgNotAvailable}
							width={400}
							height={400}
							alt='Image not available'></Image>
					</div>
				)}

				{/* Movie title */}
				<h2 id='movie-title'>{Title}</h2>
			</div>
		);
	};

	return <MoviesOutput movies={watchlistedMovies} />;
}
