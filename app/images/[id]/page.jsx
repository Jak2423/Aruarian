'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function ImagePage({ params: { id } }) {
	const [image, setImage] = useState({});
	const [isLoading, SetIsLoading] = useState(true);

	const supabaseClient = useSupabaseClient();

	useEffect(() => {
		async function getImageById() {
			const { data } = await supabaseClient.from('images').select().match({ id }).single();

			setImage(data);
		}

		getImageById();
	}, []);

	return (
		<div className='w-full max-w-md px-2 py-4'>
			<h2 className='mt-2 mb-2 text-lg text-gray-900 truncate md:mb-4 md:text-2xl'>
				{image.title}
			</h2>
			<div className='relative w-full overflow-hidden bg-gray-400 rounded-lg '>
				<img src={image.image_src} alt={image.title} className='object-contain w-full h-auto' />
			</div>
		</div>
	);
}
