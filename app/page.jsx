import { createClient } from '@/utils/supabase-server';
import ImageCard from '../components/ImageCard';

async function getImages() {
	const supabaseClient = createClient();
	const { data, error } = await supabaseClient
		.from('images')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		throw new Error(JSON.stringify(error));
	}
	return data;
}

export default async function Home() {
	const images = await getImages();

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
