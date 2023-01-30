'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import cn from 'classnames';

export default function ImageCard({ image }) {
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
