declare interface movieInterface {
	title: string;
	originalTitle: string;
	releaseDate: string | undefined;
	runtime: string;
	directors: string | JSX.Element[];
	plot: string;
	actors: JSX.Element;
	imdbRating: number | string;
	imdbVotes: string;
	awards: string;
	language: string;
	country: string;
}
