export default function FilteringInputs() {
	//handles output of select List options
	const SelectListOptions = () => {
		//lists available to access through API
		let list: string[] = [
			'most_pop_movies',
			'most_pop_series',
			'top_boxoffice_200',
			'top_boxoffice_last_weekend_10',
			'top_rated_250',
			'top_rated_english_250',
			'top_rated_lowest_100',
			'top_rated_series_250',
			'top_rated_titles',
		];

		return list.map((item) => {
			let listNameSplitArray = item.split('_');

			//first word is capitalized and the rest returned with space in front
			let nameDisplay = listNameSplitArray.map((el, index) => {
				if (index === 0)
					return listNameSplitArray[0].slice(0, 1).toLocaleUpperCase() + listNameSplitArray[0].slice(1);
				else return ' ' + el;
			});

			return (
				<option
					value={item}
					key={item}>
					{nameDisplay}
				</option>
			);
		});
	};

	//handles output of genre options
	const SelectGenreOptions = () => {
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
	};

	return (
		<div id='filtering-inputs'>
			<select id='select-list'>
				<SelectListOptions />
			</select>
			<select id='select-genre'>
				<SelectGenreOptions />
			</select>
			<input
				id='input-year'
				type='text'></input>
		</div>
	);
}
