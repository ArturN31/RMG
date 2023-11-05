import Image from 'next/image';

import { useAppSelector } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';

export default function PosterAside() {
	const movieState = useAppSelector((state: RootState) => state.movie);
	const movie: any = movieState.movie;

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

	return (
		<div id='poster-aside'>
			{posterData &&
			posterData.posterURL &&
			posterData.posterAltText &&
			posterData.height &&
			posterData.width ? (
				<Image
					id='movie-poster'
					width={posterData.width}
					height={posterData.height}
					alt={posterData.posterAltText}
					src={posterData.posterURL}
				/>
			) : (
				<p id='poster-error'>{posterData?.message}</p>
			)}
		</div>
	);
}
