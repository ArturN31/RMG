'use client';
import './globals.scss';
import { store } from '@/lib/reduxStore/store';
import { Provider } from 'react-redux';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<html lang='en'>
				<body>{children}</body>
			</html>
		</Provider>
	);
}
