'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function ImagePage({ params: { id } }) {
	const [image, setImage] = useState({});
	const supabaseClient = useSupabaseClient();

	useEffect(() => {
		async function getImageById() {
			const { data, error } = await supabaseClient
				.from('images')
				.select()
				.match({ id })
				.single();

			if (error) {
				throw new Error(JSON.stringify(error));
			}
			setImage(data);
		}

		getImageById();
	}, []);

	return (
		<div className='px-2 py-4'>
			<div className='max-h-[30rem] max-w-md'>
				<h2 className='my-2 ml-2 text-lg truncate md:mb-4 md:text-xl '>{image.title}</h2>
				<a
					href={image.href}
					target='_blank'
					rel='noopener noreferrer'
					className='bg-bgSecondary'
				>
					<img
						src={image.href}
						alt={image.title}
						className='object-contain w-auto h-full rounded-lg hover:opacity-70'
					/>
				</a>
			</div>
		</div>
	);
}
