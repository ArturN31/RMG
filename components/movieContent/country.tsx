'use client';

export default function Country(props: any) {
	const { country } = props;
	return (
		<div>
			{country.split(', ').length > 1 ? (
				<p>
					<span className='movie-section-title'>Countries:</span> {country}
				</p>
			) : (
				<p>
					<span className='movie-section-title'>Country:</span> {country}
				</p>
			)}
		</div>
	);
}
