'use client';

export default function Director(props: any) {
	const { directors } = props;
	return directors !== 'No Directors' ? (
		<div className='movie-subdetails'>
			<p className='movie-section-title'>{directors.length > 1 ? 'Director(s):' : 'Director:'}</p>
			{directors}
		</div>
	) : (
		''
	);
}
