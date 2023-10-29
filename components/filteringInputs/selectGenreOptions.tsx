'use client';

export default function SelectGenreOptions() {
	//genres available to access through API
	let genre: string[] = [
		'null',
		'Action',
		'Adult',
		'Adventure',
		'Animation',
		'Biography',
		'Comedy',
		'Crime',
		'Documentary',
		'Drama',
		'Family',
		'Fantasy',
		'Film-Noir',
		'Game-Show',
		'History',
		'Horror',
		'Music',
		'Musical',
		'Mystery',
		'News',
		'Reality-TV',
		'Romance',
		'Sci-Fi',
		'Short',
		'Sport',
		'Talk-Show',
		'Thriller',
		'War',
		'Western',
	];

	return genre.map((item) => {
		return (
			<option
				value={item}
				key={item}>
				{item}
			</option>
		);
	});
}
