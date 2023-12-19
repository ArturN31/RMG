'use client';

import './watchlist.scss';
import Header from '@/components/layout/header';
import WatchlistRuntime from '@/components/watchlist/watchlistRuntime';
import WatchlistedMoviesOutput from '@/components/watchlist/watchlistedMoviesOutput';

export default function Watchlist() {
	return (
		<>
			<Header />
			<WatchlistRuntime />
			<WatchlistedMoviesOutput />
		</>
	);
}
