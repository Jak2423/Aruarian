'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import cn from 'classnames';

export default function ImagePage({ params: { id } }) {
	const [image, setImage] = useState({});
	const [isLoading, SetIsLoading] = useState(true);

	const supabaseClient = useSupabaseClient();

	useEffect(() => {
		async function getImageById() {
			const { data, error } = await supabaseClient
				.from('images')
				.select()
				.match({ id })
				.single();

			if (!error) {
				setImage(data);
			}
		}

		getImageById();
	}, []);

	return (
		<div className='w-full max-w-md px-2 py-4'>
			<h2 className='mt-2 mb-2 text-lg text-gray-900 truncate md:mb-4 md:text-2xl'>
				{image.title}
			</h2>
			<div className='relative w-full overflow-hidden bg-gray-400 rounded-lg '>
				<Image
					src={image.image_src}
					alt={image.title}
					fill={true}
					quality={20}
					sizes='50vw'
					className={cn(
						'duration-300 ease-in custom-img rounded-lg hover:opacity-70 shadow-lg',
						isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
					)}
					onLoadingComplete={() => SetIsLoading(false)}
				/>
			</div>
		</div>
	);
}
