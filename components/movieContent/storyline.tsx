'use client';

export default function Storyline(props: any) {
	const { plot } = props;
	return (
		<div className='movie-subdetails'>
			<p className='movie-section-title'>Storyline:</p>
			<p style={{ textAlign: 'justify' }}>{plot}</p>
		</div>
	);
}
