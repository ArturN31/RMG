'use client';

export default function ReleaseDateAndRuntime(props: any) {
	const { releaseDate, runtime } = props;
	return (
		<div>
			{/* Release date */}
			{releaseDate !== 'Date cannot be retrieved' ? <span>{releaseDate}</span> : ''}

			{/* Displays | when release date and runtime are both retrieved */}
			{releaseDate !== 'Date cannot be retrieved' && runtime !== 'N/A' ? <span> | </span> : ''}

			{/* Runtime */}
			{runtime !== 'N/A' ? <span>{runtime}</span> : ''}
		</div>
	);
}
