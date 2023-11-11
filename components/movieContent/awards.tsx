'use client';

export default function Awards(props: any) {
	const { awards } = props;
	return awards !== 'N/A' ? (
		<p>
			<span className='movie-section-title'>Awards:</span> {awards}
		</p>
	) : (
		''
	);
}
