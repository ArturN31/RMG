'use client';

import { useAppSelector } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';

export default function MovieContent() {
	const movieState = useAppSelector((state: RootState) => state.movie);

	let getMovieData = (movie: any) => {
		if (movie.movie) {
			//destructuring state
			const { titleText, originalTitleText, releaseDate } = movie.movie;
			const { Runtime, Director, Plot, Actors, imdbRating, imdbVotes, Awards, Language, Country } = movie.movieDetails;

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

			//get votes
			const getVotes = (votes: any) => {
				console.log(votes);
				const v = votes.replace(',', '');
				//returns thousands
				if (v > 1000) return '~' + (v / 1000).toFixed(0) + 'K votes';
				//returns milions
				if (v > 1000000) return '~' + (v / 1000000).toFixed(0) + 'M votes';
				//returns hundreds
				return v + ' votes';
			};
			const votes = getVotes(imdbVotes);

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
				imdbVotes: votes,
				awards: Awards,
				language: Language,
				country: Country,
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
						{/* Displays movie title */}
						<div id='title-rating-block'>
							<div id='movie-title'>
								<p>{movieData.title}</p>
								{movieData.title !== movieData.originalTitle ? <p>({movieData.originalTitle})</p> : ''}
							</div>
							{/* Displays rating and votes */}
							{movieData.imdbRating !== 'N/A' ? (
								<div id='rating-container'>
									<p id='rating'>
										<span>{movieData.imdbRating}</span>/10 <span id='star'></span>
									</p>
									<p id='votes'>{movieData.imdbVotes}</p>
								</div>
							) : (
								''
							)}
						</div>

						<div>
							{/* Release date */}
							{movieData.releaseDate !== 'Date cannot be retrieved' ? <span>{movieData.releaseDate}</span> : ''}

							{/* Displays | when release date and runtime are both retrieved */}
							{movieData.releaseDate !== 'Date cannot be retrieved' && movieData.runtime !== 'N/A' ? (
								<span> | </span>
							) : (
								''
							)}

							{/* Runtime */}
							{movieData.runtime !== 'N/A' ? <span>{movieData.runtime}</span> : ''}
						</div>

						<div className='movie-subdetails'>
							{/* Awards */}
							{movieData.awards !== 'N/A' ? (
								<p>
									<span className='movie-section-title'>Awards:</span> {movieData.awards}
								</p>
							) : (
								''
							)}

							{/* Language */}
							<div>
								{movieData.language.split(', ').length > 1 ? (
									<p>
										<span className='movie-section-title'>Languages:</span> {movieData.language}
									</p>
								) : (
									<p>
										<span className='movie-section-title'>Language:</span> {movieData.language}
									</p>
								)}
							</div>

							{/* Country */}
							<div>
								{movieData.country.split(', ').length > 1 ? (
									<p>
										<span className='movie-section-title'>Countries:</span> {movieData.country}
									</p>
								) : (
									<p>
										<span className='movie-section-title'>Country:</span> {movieData.country}
									</p>
								)}
							</div>
						</div>

						{/* Directors */}
						{movieData.directors !== 'No Directors' ? (
							<div className='movie-subdetails'>
								<p className='movie-section-title'>{movieData.directors.length > 1 ? 'Director(s):' : 'Director:'}</p>
								{movieData.directors}
							</div>
						) : (
							''
						)}

						{/* Actors */}
						<div className='movie-subdetails'>
							<p className='movie-section-title'>Stars:</p>
							{movieData.actors}
						</div>

						{/* Storyline */}
						<div className='movie-subdetails'>
							<p className='movie-section-title'>Storyline:</p>
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
