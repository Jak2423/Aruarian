'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<p>Oh no, something went wrong... maybe refresh?</p>
		</div>
	);
}
