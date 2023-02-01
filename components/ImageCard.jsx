'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import cn from 'classnames';

export default function ImageCard({ image }) {
	const [isLoading, SetIsLoading] = useState(true);

	return (
		<div className='mb-2 bg-gray-300 rounded-lg break-inside-avoid lg:mb-4'>
			<Link
				href={`/images/${image.id}`}
				className='relative w-full overflow-hidden bg-gray-600 break-inside-avoid '
			>
				<Image
					alt={image.title}
					src={image.image_src}
					fill={true}
					quality={20}
					sizes='50vw, (min-width: 640px) 33vw, (min-width: 1024px) 25vw'
					className={cn(
						'duration-500 ease-in custom-img rounded-lg hover:opacity-70 shadow-lg',
						isLoading ? 'opacity-0' : 'opacity-100',
					)}
					onLoadingComplete={() => SetIsLoading(false)}
				/>
			</Link>
		</div>
	);
}
