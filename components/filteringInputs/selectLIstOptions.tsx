'use client';

export default function SelectListOptions() {
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
	];

	return list.map((item) => {
		let listNameSplitArray: string[] = item.split('_');

		//first word is capitalized and the rest returned with space in front
		let nameDisplay: string[] = listNameSplitArray.map((el, index) => {
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
}
