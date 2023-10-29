'use client';

import Header from '@/components/layout/header';
import PosterAside from '@/components/layout/posterAside';
import MovieContent from '@/components/layout/movieContent';
import FilteringInputs from '@/components/layout/filteringInputs';

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<PosterAside />
				<FilteringInputs />
				<MovieContent />
			</main>
		</>
	);
}
