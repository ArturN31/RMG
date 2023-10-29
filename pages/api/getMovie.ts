import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	interface ResponseFuncs {
		POST?: Function;
	}
	const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

	const handleCase: ResponseFuncs = {
		// RESPONSE FOR POST REQUESTS
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			//getting user request and parsing it to JSON
			const filters: string = JSON.stringify(req.body);
			type filtersJSONType = {
				list: string;
				genre: string;
			};
			const filtersJSON: filtersJSONType = JSON.parse(filters);

			//getting filters
			const list: string = filtersJSON.list;
			const genre: string = filtersJSON.genre;

			if (process.env.MOVIES_DATABASE_API_KEY !== undefined) {
				//preping API url
				let MoviesDatabaseAPIurl: string;
				genre === 'null'
					? (MoviesDatabaseAPIurl = `https://moviesdatabase.p.rapidapi.com/titles/random?&list=${list}&limit=1`)
					: (MoviesDatabaseAPIurl = `https://moviesdatabase.p.rapidapi.com/titles/random?&genre=${genre}&list=${list}&limit=1`);

				const options: Object = {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': process.env.MOVIES_DATABASE_API_KEY,
						'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
					},
				};

				//calling API to get a random movie
				const getRandomMovie: Response = await fetch(MoviesDatabaseAPIurl, options).then((el: any) =>
					el.json()
				);

				//getting movie IMDb ID
				const getMovie: any = getRandomMovie;
				const getMovieResults: any = getMovie.results[0];
				if (getMovieResults !== undefined) {
					const getMovieID: any = getMovieResults.id;

					if (process.env.OMDB_API_KEY !== undefined) {
						const OMDBAPIurl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${getMovieID}&plot=full`;

						const getMovieDetails: Response = await fetch(OMDBAPIurl).then((el: any) => el.json());

						const responseToFrontend = {
							movie: await getMovieResults,
							movieDetails: await getMovieDetails,
						};

						//sending response
						res.status(200).send(await responseToFrontend);
					}
				} else {
					//there are no movies that match genre and list
					res.status(404).send({ message: 'Not found' });
				}
			}
		},
	};

	// Check if there is a response for the particular method, if so invoke it, if not response with an error
	const response = handleCase[method];
	if (response) return response(req, res);
	else res.status(400).json({ error: 'No Response for This Request' });
};

export default handler;
