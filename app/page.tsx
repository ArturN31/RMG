import Header from '@/components/header';
import ImgAside from '@/components/imgAside';
import MovieContent from '@/components/movieContent';
import FilteringInputs from '@/components/filteringInputs';

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<ImgAside />
				<div id='movie-aside'>
					<FilteringInputs />
					<MovieContent />
				</div>
			</main>
		</>
	);
}
