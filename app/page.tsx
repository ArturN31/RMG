'use client';

import Header from '@/components/header';
import PosterAside from '@/components/posterAside';
import MovieContent from '@/components/movieContent';
import FilteringInputs from '@/components/filteringInputs';
import { useState } from 'react';

export default function Home() {
	const [filters, setFilters] = useState();

	// const postParamsToAPI = async () => {
	// 	await fetch('api/getMovie', {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: filters,
	// 	});
	// };

	return (
		<>
			<Header />
			<main>
				<PosterAside />
				<FilteringInputs setFilters={setFilters} />
				<MovieContent />
			</main>
		</>
	);
}
