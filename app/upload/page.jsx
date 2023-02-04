'use client';

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Upload() {
	const user = useUser();
	const router = useRouter();
	const textAreaRef = useRef(null);
	const fileRef = useRef(null);
	const supabaseClient = useSupabaseClient();
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const [selectedFile, setSelectedFile] = useState(null);

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
			setIsDisabled(false);
		}
	};

	const submitImage = async (e) => {
		e.preventDefault();

		if (!selectedFile) {
			return;
		}

		const { error } = await supabaseClient.storage
			.from('images')
			.upload(`public/${selectedFile?.name}`, selectedFile);

		if (error) {
			console.log(JSON.stringify(error));
			return;
		}

		insertImageTo();
		setTitle('');
		fileRef.current.value = null;
		setSelectedFile(null);
	};

	const insertImageTo = async () => {
		const { data } = supabaseClient.storage
			.from('images')
			.getPublicUrl(`public/${selectedFile?.name}`);

		const { error } = await supabaseClient.from('images').insert({
			title: title,
			user_id: user.id,
			href: data.publicUrl,
			filename: selectedFile?.name,
		});

		if (error) {
			console.log(JSON.stringify(error));
			return;
		}

		router.replace('/');
	};

	return (
		<div className='flex flex-col h-full gap-5 px-4 py-6 max-h-screen1 md:flex-row md:py-10 md:px-20'>
			<form className='flex flex-col w-full max-w-md gap-10'>
				<input
					required
					type='file'
					accept='image/*'
					aria-label='File upload'
					ref={fileRef}
					onChange={(e) => handleUpload(e)}
					className='w-full max-w-xs text-xs truncate border border-black rounded-lg file:text-xs lg:text-sm lg:file:text-sm file:mr-2 file:px-4 file:py-2 file:border-0 file:bg-gray-700 file:text-white hover:file:opacity-70'
				/>
				<textarea
					type='text'
					rows={1}
					placeholder='Add your title'
					required
					maxLength={50}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					ref={textAreaRef}
					className='w-full pb-5 overflow-hidden text-lg break-words whitespace-pre-wrap bg-gray-100 border-b border-black outline-none resize-none lg:text-2xl'
				/>
				<button
					onClick={(e) => submitImage(e)}
					disabled={isDisabled ? true : false}
					className='w-20 px-4 py-2 text-sm text-white bg-black rounded-lg hover:opacity-70 disabled:opacity-40'
				>
					Submit
				</button>
			</form>
			{selectedFile && (
				<div className='flex items-center justify-center w-full h-auto'>
					<img
						src={URL.createObjectURL(selectedFile)}
						alt='Selected image preview'
						className='object-contain w-auto h-full rounded-lg '
					/>
				</div>
			)}
		</div>
	);
}
