'use client';

export default function MovieTitle(props: any) {
	const { title, originalTitle } = props;
	return (
		<div id='movie-title'>
			<p>{title}</p>
			{title !== originalTitle ? <p>({originalTitle})</p> : ''}
		</div>
	);
}
