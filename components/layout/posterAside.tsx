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
			const posterURL: string = primaryImage.url;
			const posterAltText: string = primaryImage.caption.plainText;
			const height: number = primaryImage.height;
			const width: number = primaryImage.width;

			//prep poster data object
			let posterData = {
				posterURL: posterURL,
				posterAltText: posterAltText,
				height: height,
				width: width,
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
				''
			)}
		</div>
	);
}
