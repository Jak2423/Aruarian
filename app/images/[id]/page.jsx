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
			<img
				src={image.image_src}
				alt={image.title}
				className='object-contain w-full h-auto bg-no-repeat bg-cover rounded-lg'
			/>
			{/* <h3 className='font-medium text-gray-900 truncate text-md'>@{image.username}</h3> */}
		</div>
	);
}
