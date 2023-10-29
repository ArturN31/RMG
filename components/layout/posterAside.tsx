import Image from 'next/image';

import { useAppSelector } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';

export default function PosterAside() {
	const movieState = useAppSelector((state: RootState) => state.movie);
	const movie: any = movieState.movie;

	const getPosterURL = () => {
		if (movie.movie) {
			return movie.movie.primaryImage.url;
		}
	};

	const getPosterAltText = () => {
		if (movie.movie) {
			return movie.movie.primaryImage.caption.plainText;
		}
	};

	const getPosterHeight = () => {
		if (movie.movie) {
			return movie.movie.primaryImage.height;
		}
	};

	const getPosterWidth = () => {
		if (movie.movie) {
			return movie.movie.primaryImage.height;
		}
	};

	const posterURL: string = getPosterURL();
	const posterAltText: string = getPosterAltText();
	const height: number = getPosterHeight();
	const width: number = getPosterWidth();

	return (
		<div id='poster-aside'>
			{posterURL && posterAltText && height && width ? (
				<Image
					id='movie-poster'
					width={width}
					height={height}
					alt={posterAltText}
					src={posterURL}
				/>
			) : (
				''
			)}
		</div>
	);
}
