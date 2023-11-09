import Image from 'next/image';

import { useAppSelector, useAppDispatch } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';
import { setPosterLoaded } from '@/lib/reduxStore/movieSlice';

export default function PosterAside() {
	const movieState = useAppSelector((state: RootState) => state.movie);
	const movie: any = movieState.movie;
	const dispatch = useAppDispatch();

	let getPosterData = (movie: any) => {
		if (movie.movie) {
			//destructuring state
			const { primaryImage } = movie.movie;

			//getting poster data
			const getPosterData = (image: any) => {
				if (image) {
					const posterURL: string = image.url;
					const posterAltText: string = image.caption.plainText;
					const height: number = image.height;
					const width: number = image.width;
					return {
						posterURL,
						posterAltText,
						height,
						width,
					};
				} else return { message: 'Poster cannot be retrieved.' };
			};
			const poster = getPosterData(primaryImage);

			//prep poster data object
			let posterData = {
				posterURL: poster.posterURL,
				posterAltText: poster.posterAltText,
				height: poster.height,
				width: poster.width,
				message: poster.message,
			};

			return posterData;
		}
	};

	let posterData = getPosterData(movie);

	//if the poster is loaded, this function sets the state that will be used to output movie data alongside the poster.
	const handlePosterLoaded = () => {
		if (posterData?.message) dispatch(setPosterLoaded(true));
		else dispatch(setPosterLoaded(true));
	};

	return (
		<div id='poster-aside'>
			{posterData && posterData.posterURL && posterData.posterAltText && posterData.height && posterData.width ? (
				<Image
					priority
					id='movie-poster'
					width={posterData.width}
					height={posterData.height}
					alt={posterData.posterAltText}
					src={posterData.posterURL}
					onLoad={() => handlePosterLoaded()}
				/>
			) : (
				<p id='poster-error'>{posterData?.message}</p>
			)}
		</div>
	);
}
