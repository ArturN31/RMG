import Image from 'next/image';

import { useAppSelector, useAppDispatch } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';
import { setPosterLoaded, setPosterError } from '@/lib/reduxStore/movieSlice';
import { useEffect, useState } from 'react';

export default function PosterAside() {
	const movieState = useAppSelector((state: RootState) => state.movie);
	const posterError = useAppSelector((state: RootState) => state.movie.posterError);
	const movie: any = movieState.movie;
	const dispatch = useAppDispatch();

	const [posterData, setPosterData] = useState<any>();

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
				} else {
					dispatch(setPosterError('Poster cannot be retrieved.'));
					return {};
				}
			};
			const poster = getPosterData(primaryImage);

			//prep poster data object
			let posterData = {
				posterURL: poster.posterURL,
				posterAltText: poster.posterAltText,
				height: poster.height,
				width: poster.width,
			};

			return posterData;
		}
	};

	useEffect(() => {
		setPosterData(getPosterData(movie));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movie]);

	return (
		<div id='poster-aside'>
			{posterError !== '' ? <p id='poster-error'>{posterError}</p> : ''}

			{posterData && posterData.posterURL && posterData.posterAltText && posterData.height && posterData.width ? (
				<Image
					priority
					id='movie-poster'
					width={posterData.width}
					height={posterData.height}
					alt={posterData.posterAltText}
					src={posterData.posterURL}
					onLoad={() => {
						dispatch(setPosterLoaded(true));
						dispatch(setPosterError(''));
					}}
					onError={() => {
						dispatch(setPosterLoaded(false));
						dispatch(setPosterError('Image cannot be loaded'));
					}}
				/>
			) : (
				''
			)}
		</div>
	);
}
