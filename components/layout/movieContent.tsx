'use client';

import { useAppSelector } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';

export default function MovieContent() {
	const movieState = useAppSelector((state: RootState) => state.movie);
	const movie: any = movieState.movie;

	const getMovieTitle = () => {
		if (movie.movie) {
			return movie.movie.titleText.text;
		}
	};

	const getOriginalMovieTitle = () => {
		if (movie.movie) {
			return movie.movie.originalTitleText.text;
		}
	};

	const getMovieDate = () => {
		if (movie.movie) {
			const releaseDate = movie.movie.releaseDate;
			const day = releaseDate.day;
			const month = releaseDate.month;
			const year = releaseDate.year;
			const date = `${day}/${month}/${year}`;
			return date;
		} else return '';
	};

	const getMovieLength = () => {
		if (movie.movieDetails) {
			return movie.movieDetails.Runtime;
		}
	};

	const getMovieDirector = () => {
		if (movie.movieDetails) {
			return movie.movieDetails.Director;
		}
	};

	const getMovieActors = () => {
		if (movie.movieDetails) {
			const actors = movie.movieDetails.Actors.split(', ');
			return actors.map((actor: string) => <p key={actor}>{actor}</p>);
		}
	};

	const getMoviePlot = () => {
		if (movie.movieDetails) {
			return movie.movieDetails.Plot;
		}
	};

	const title: string = getMovieTitle();
	const originalTitle: string = getOriginalMovieTitle();
	const date: string = getMovieDate();
	const length: number = getMovieLength();
	const director: number = getMovieDirector();
	const actors: number = getMovieActors();
	const plot: number = getMoviePlot();

	return (
		<div id='movie-details-container'>
			<div id='movie-details'>
				<div id='title'>
					<h2>Title: {title}</h2>
					<h3>Original Title: ({originalTitle})</h3>
					<h4>
						Release date: {date} | Length: {length}
					</h4>
				</div>
				<div id='director'>
					<p>Director:</p>
					<p>{director}</p>
				</div>
				<div id='actors'>
					<p>Actors:</p>
					{actors}
				</div>
				<div id='plot'>
					<p>Plot:</p>
					<p>{plot}</p>
				</div>
			</div>
		</div>
	);
}
