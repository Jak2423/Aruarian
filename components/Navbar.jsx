'use client';

import Link from 'next/link';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { FiUpload } from 'react-icons/fi';

export default function Navbar() {
	const router = useRouter();
	const user = useUser();
	const supabaseClient = useSupabaseClient();

	return (
		<nav className='sticky top-0 z-40 bg-bgPrimary'>
			<div className='relative flex items-center justify-between px-2 py-4'>
				<Link href='/'>
					<h1 className='text-secondary font-medium text-xl md:text-2xl'>Aruarian</h1>
				</Link>
				<div>
					{user ? (
						<div className='flex items-center space-x-8 '>
							<Link href='/upload' className='text-lg md:text-xl hover:text-secondary'>
								<FiUpload />
							</Link>
							<span
								onClick={async () => {
									await supabaseClient.auth.signOut();
									router.push('/login');
								}}
								className='text-sm font-medium cursor-pointer md:text-base hover:text-secondary'
							>
								Log out
							</span>
						</div>
					) : (
						<Link
							href='/login'
							className='text-sm font-medium md:text-base hover:text-secondary'
						>
							Log in
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
