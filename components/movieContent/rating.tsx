'use client';

export default function MovieRating(props: any) {
	const { imdbRating, imdbVotes } = props;
	return imdbRating !== 'N/A' ? (
		<div id='rating-container'>
			<p id='rating'>
				<span>{imdbRating}</span>/10 <span id='star'></span>
			</p>
			<p id='votes'>{imdbVotes}</p>
		</div>
	) : (
		''
	);
}
