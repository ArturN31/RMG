'use client';

import { useAppSelector } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';

export default function MovieContent() {
	const movieState = useAppSelector((state: RootState) => state.movie);

	let getMovieData = (movie: any) => {
		if (movie.movie) {
			//destructuring state
			const { titleText, originalTitleText, releaseDate } = movie.movie;
			const { Runtime, Director, Plot, Actors, imdbRating, imdbVotes, Awards } = movie.movieDetails;

			//get title
			const getTitle: string = titleText.text;
			const getOriginalTitle: string = originalTitleText.text;

			//get date
			const getDate = (releaseDate: any) => {
				if (releaseDate && releaseDate.day) {
					const getDay: number = releaseDate.day;
					const getMonth: number = releaseDate.month;
					const getYear: number = releaseDate.year;
					if (getDay && getMonth && getYear) return new Date(getYear, getMonth - 1, getDay).toLocaleDateString();
				} else return 'Date cannot be retrieved';
			};
			const date = getDate(releaseDate);

			//get runtime
			const getRuntime: number = Runtime.split(' ')[0];
			const getRuntimeString = (runtime: number) => {
				//if more than one hour
				if (getRuntime / 60 > 1) {
					if (getRuntime % 60 === 0) return `${Math.round(runtime / 60)} hrs`;
					else return `${Math.round(runtime / 60)} hrs ${runtime % 60} min`;
				}
				//if one hour
				if (getRuntime / 60 === 1) {
					if (getRuntime % 60 === 0) return `${Math.round(runtime / 60)} hrs`;
					else return `${Math.round(runtime / 60)} hrs ${runtime % 60} min`;
				}
				//if less than one hour
				if (getRuntime / 60 < 1) return `${runtime} min`;

				//returns runtime such as '57S'
				return getRuntime;
			};
			const runtime = getRuntimeString(getRuntime);

			//get directors
			const getDirectors = (directors: string) => {
				if (directors === 'N/A') return 'No Directors';
				return directors.split(', ').map((director) => {
					return <p key={director}>{director}</p>;
				});
			};
			const directors = getDirectors(Director);

			//get actors
			const getActors = Actors.split(', ').map((actor: string) => <p key={actor}>{actor}</p>);

			/*
				LANGUAGE, COUNTRY

				"Language":"Hebrew, English",
				"Country":"Israel, Germany",
			*/

			//prep movie data object
			const movieData = {
				title: getTitle,
				originalTitle: getOriginalTitle,
				releaseDate: date,
				runtime: runtime,
				directors: directors,
				plot: Plot,
				actors: getActors,
				imdbRating: imdbRating,
				imdbVotes: imdbVotes,
				awards: Awards,
			};

			return movieData;
		}
	};

	let movieData = getMovieData(movieState.movie);

	return (
		<div id='movie-details-container'>
			<div id='movie-details'>
				{/* Displays movie content if there is no message */}
				{!movieState.hasOwnProperty('message') && movieData ? (
					<>
						<div id='movie-title'>
							<p>{movieData.title}</p>
							{movieData.title !== movieData.originalTitle ? <p>({movieData.originalTitle})</p> : ''}
						</div>

						<div className='movie-subdetails'>
							<p>
								IMDb rating: {movieData.imdbRating} - {movieData.imdbVotes} votes
							</p>

							{movieData.releaseDate !== 'Date cannot be retrieved' ? <p>Released: {movieData.releaseDate}</p> : ''}

							{movieData.runtime !== 'N/A' ? <p>Runtime: {movieData.runtime}</p> : ''}

							{movieData.awards !== 'N/A' ? <p>Awards: {movieData.awards} </p> : ''}
						</div>

						{movieData.directors !== 'No Directors' ? (
							<div className='movie-subdetails'>
								<p className='movie-section-title'>Director(s):</p>
								{movieData.directors}
							</div>
						) : (
							''
						)}

						<div className='movie-subdetails'>
							<p className='movie-section-title'>Actor(s):</p>
							{movieData.actors}
						</div>

						<div className='movie-subdetails'>
							<p className='movie-section-title'>Plot:</p>
							<p style={{ textAlign: 'justify' }}>{movieData.plot}</p>
						</div>
					</>
				) : (
					''
				)}

				{/* Displays error */}
				{movieState.error ? <p>{movieState.error}</p> : ''}
			</div>
		</div>
	);
}
