'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Home() {
	const [images, setImages] = useState([]);
	const supabaseClient = useSupabaseClient();

	useEffect(() => {
		async function getImages() {
			const { data } = await supabaseClient
				.from('images')
				.select('*')
				.order('created_at', { ascending: false });
			setImages(data);
		}

		getImages();
	}, []);

	return (
		<main className='px-2 py-4'>
			<div className='columns-2 gap-x-2 sm:columns-3 md:columns-4 lg:gap-x-4'>
				{images.map((image) => (
					<ImageCard key={image.id} image={image} />
				))}
			</div>
		</main>
	);
}

function ImageCard({ image }) {
	const [isLoading, SetIsLoading] = useState(true);

	return (
		<div className='mb-2 bg-gray-200 rounded-lg break-inside-avoid lg:mb-4'>
			<Link href={`/images/${image.id}`} className='relative w-full overflow-hidden'>
				<Image
					alt={image.title}
					src={image.image_src}
					fill={true}
					quality={20}
					sizes='50vw, (min-width: 640px) 33vw, (min-width: 1024px) 25vw'
					className={cn(
						'duration-300 ease-in custom-img rounded-lg hover:opacity-70 shadow-lg',
						isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
					)}
					onLoadingComplete={() => SetIsLoading(false)}
				/>
			</Link>
		</div>
	);
}
