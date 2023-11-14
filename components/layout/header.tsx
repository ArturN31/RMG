import { useEffect } from 'react';

export default function Header() {
	useEffect(() => {
		const getPage: string = document.URL.split('/').reverse()[0];
		if (getPage === '') {
			const getElement = document.getElementById('rmg');
			if (getElement && !getElement.className.includes('active')) getElement.className += 'active';
		}

		if (getPage === 'watchlist') {
			const getElement = document.getElementById('watchlist');
			if (getElement && !getElement.className.includes('active')) getElement.className += 'active';
		}
	}, []);

	return (
		<header>
			<h1>RMG</h1>
			<nav>
				<a
					href='/'
					id='rmg'>
					<button>RMG</button>
				</a>
				<a
					href='/watchlist'
					id='watchlist'>
					<button>Watchlist</button>
				</a>
			</nav>
		</header>
	);
}
