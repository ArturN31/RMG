'use client';

import { useEffect, useState } from 'react';
import './movie.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import imgNotAvailable from '../../../public/img/Image_not_available.png';
import WatchlistButton from '@/components/movieContent/watchlistBtn';

export default function Movie() {
	const [watchlistedMovies, setWatchlistedMovies] = useState();
	const [currentMovie, setCurrentMovie] = useState();

	const { back } = useRouter();

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

	const getMovie = (movies: any) => {
		if (movies) {
			//retrieves movie id from url
			const passedMovieId = document.URL.split('?')[1].split('=')[1];
			//retrieves movie based on passed id
			return movies.filter((movie: any) => {
				if (movie.id === passedMovieId) return movie;
			});
		}
	};

	useEffect(() => {
		if (watchlistedMovies) {
			setCurrentMovie(getMovie(watchlistedMovies)[0]);
		}
	}, [watchlistedMovies]);

	const GoBackBtn = () => {
		return (
			<button
				id='back-btn'
				onClick={() => {
					back();
				}}>
				Go back
			</button>
		);
	};

	const MoviePoster = (movie: any) => {
		if (movie && movie.movie) {
			const { primaryImage } = movie.movie;
			return primaryImage && primaryImage.url ? (
				<Image
					priority
					id='poster'
					src={primaryImage.url}
					alt={primaryImage.caption.plainText}
					width={primaryImage.width}
					height={primaryImage.height}
				/>
			) : (
				<Image
					id='no-poster'
					src={imgNotAvailable}
					width={400}
					height={400}
					alt='Image not available'></Image>
			);
		}
	};

	const getVotes = (votes: any) => {
		const v = votes.replace(',', '');
		const thousand = 1000;
		const milion = 1000000;
		//returns thousands
		if (v > thousand) return `~ ${(v / thousand).toFixed(0)} K votes`;
		//returns milions
		if (v > milion) return `~ ${(v / milion).toFixed(0)} M votes`;
		//returns hundreds
		return `${v} votes`;
	};

	const getDate = (releaseDate: any) => {
		if (releaseDate && releaseDate.day) {
			const getDay: number = releaseDate.day;
			const getMonth: number = releaseDate.month;
			const getYear: number = releaseDate.year;
			if (getDay && getMonth && getYear) return new Date(getYear, getMonth - 1, getDay).toLocaleDateString();
		} else return 'Date cannot be retrieved';
	};

	const getRuntimeString = (runtime: number) => {
		//if more than one hour
		if (Math.floor(runtime / 60) > 1) {
			if (runtime % 60 === 0) return `${runtime / 60} hrs`;
			else return `${Math.floor(runtime / 60)} hrs ${runtime % 60} min`;
		}
		//if one hour
		if (Math.floor(runtime / 60) === 1) {
			if (runtime % 60 === 0) return `${runtime / 60} hr`;
			else return `${Math.floor(runtime / 60)} hr ${runtime % 60} min`;
		}
		//if less than one hour
		if (runtime / 60 < 1) return `${runtime} min`;

		//returns runtime such as '57S'
		return `${runtime}`;
	};

	const getDirectors = (directors: string) => {
		if (directors === 'N/A') return 'No Directors';
		return directors.split(', ').map((director) => {
			return director;
		});
	};

	const MovieDetails = (movie: any) => {
		if (movie && movie.movie) {
			const { Title, Actors, Awards, Director, Country, Language, Plot, releaseDate, Runtime, imdbRating, imdbVotes } =
				movie.movie;

			//get votes
			const votes: string = getVotes(imdbVotes);

			//get date
			const date = getDate(releaseDate);

			//get runtime
			const getRuntime: number = Runtime.split(' ')[0];
			const runtime: string = getRuntimeString(getRuntime);

			//get directors
			const directors = getDirectors(Director);

			//get actors
			const getActors = Actors.split(', ').map((actor: string) => {
				return actor;
			});

			return (
				<div id='movie-details'>
					{/* TITLE AND RATING*/}
					<div className='two-cols-block'>
						<p id='movie-title'>{Title}</p>
						{imdbRating !== 'N/A' ? (
							<div id='rating-container'>
								<p id='rating'>
									<span>{imdbRating}</span>/10 <span id='star'></span>
								</p>
								<p id='votes'>{votes}</p>
							</div>
						) : (
							''
						)}
					</div>

					<div className='two-cols-block'>
						{/* DATE AND RUNTIME */}
						<div id='release-runtime-block'>
							{/* Release date */}
							{date !== 'Date cannot be retrieved' ? <span>{date}</span> : ''}

							{/* Displays | when release date and runtime are both retrieved */}
							{date !== 'Date cannot be retrieved' && runtime !== 'N/A' ? <span> | </span> : ''}

							{/* Runtime */}
							{runtime !== 'N/A' ? <span>{runtime}</span> : ''}
						</div>

						<WatchlistButton movieState={currentMovie} />
					</div>

					<div className='movie-subdetails'>
						{/* AWARDS */}
						{Awards !== 'N/A' ? (
							<p>
								<span className='movie-section-title'>Awards:</span> {Awards}
							</p>
						) : (
							''
						)}

						{/* LANGUAGE */}
						<p>
							<span className='movie-section-title'>Lanugage: </span>
							{Language}
						</p>

						{/* COUNTRY */}
						<p>
							<span className='movie-section-title'>Country: </span>
							{Country}
						</p>
					</div>

					{/* DIRECTORS */}
					{directors !== 'No Directors' ? (
						<div className='movie-subdetails'>
							<p className='movie-section-title'>{directors.length > 1 ? 'Director(s):' : 'Director:'}</p>
							{directors.map((director: string) => (
								<p key={director}>{director}</p>
							))}
						</div>
					) : (
						''
					)}

					{/* STARS */}
					<div className='movie-subdetails'>
						<p className='movie-section-title'>Stars:</p>
						{getActors.map((actor: string) => {
							return <p key={actor}>{actor}</p>;
						})}
					</div>

					{/* STORYLINE */}
					<div className='movie-subdetails'>
						<p className='movie-section-title'>Storyline:</p>
						<p>{Plot}</p>
					</div>
				</div>
			);
		}
	};

	return (
		<div id='movie-block'>
			<GoBackBtn />
			<div id='main-content'>
				<MoviePoster movie={currentMovie} />
				<MovieDetails movie={currentMovie} />
			</div>
		</div>
	);
}
