'use client';

export default function Language(props: any) {
	const { language } = props;
	return (
		<div>
			{language.split(', ').length > 1 ? (
				<p>
					<span className='movie-section-title'>Languages:</span> {language}
				</p>
			) : (
				<p>
					<span className='movie-section-title'>Language:</span> {language}
				</p>
			)}
		</div>
	);
}
