'use client';

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect, useRef, useState } from 'react';

export default function Upload() {
	const supabaseClient = useSupabaseClient();
	const textAreaRef = useRef(null);
	const [title, setTitle] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);

	const user = useUser();

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = 'auto';
			const scrollHeight = textAreaRef.current.scrollHeight;

			textAreaRef.current.style.height = scrollHeight + 'px';
		}
	}, [textAreaRef.current, title]);

	const handleUpload = async (e) => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const submitImage = async (e) => {
		e.preventDefault();

		if (!selectedFile) {
			alert('An image required.');
			return;
		}

		const { data, error } = await supabaseClient.storage
			.from('images')
			.upload(`public/${selectedFile?.name}`, selectedFile);

		if (error) {
			console.log(error);
			return;
		}

		insertImageTo();
		setTitle('');
		setSelectedFile(null);
	};

	const insertImageTo = async () => {
		const { data } = supabaseClient.storage
			.from('images')
			.getPublicUrl(`public/${selectedFile?.name}`);

		const { error } = await supabaseClient
			.from('images')
			.insert({ title: title, user_id: user.id, image_src: data.publicUrl });

		if (error) {
			console.log(error);
			return;
		}
	};

	return (
		<div className='flex flex-col px-4 py-6 md:flex-row gap-5 md:py-10 md:px-20'>
			<form className='flex flex-col max-w-md w-full gap-10'>
				<input
					type='file'
					accept='image/*'
					aria-label='File upload'
					onChange={(e) => handleUpload(e)}
					className='text-xs file:text-xs lg:text-sm lg:file:text-sm file:mr-2 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:opacity-70'
				/>
				<textarea
					type='text'
					rows={1}
					placeholder='Add your title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					ref={textAreaRef}
					className='w-full text-lg border-b border-black outline-none  whitespace-pre-wrap break-words resize-none overflow-hidden pb-5 lg:text-2xl '
				/>
				<button
					onClick={(e) => submitImage(e)}
					className='w-20 text-sm bg-black text-white  rounded-lg px-4 py-2 hover:opacity-70'
				>
					Submit
				</button>
			</form>
			{selectedFile && (
				<img
					src={URL.createObjectURL(selectedFile)}
					alt='Selected image preview'
					className='w-full h-auto bg-cover bg-no-repeat object-contain rounded-lg shadow-lg'
				/>
			)}
		</div>
	);
}
