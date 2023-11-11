'use client';

export default function Actors(props: any) {
	const { actors } = props;
	return (
		<div className='movie-subdetails'>
			<p className='movie-section-title'>Stars:</p>
			{actors}
		</div>
	);
}
