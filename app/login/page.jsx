'use client';

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
	const router = useRouter();
	const user = useUser();
	const supabaseClient = useSupabaseClient();

	useEffect(() => {
		if (user) {
			router.replace('/');
		}
	}, [user]);

	return (
		<div className='max-w-md mx-auto mt-20 w-80'>
			<Auth
				supabaseClient={supabaseClient}
				providers={['google']}
				redirectTo='/'
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: '#000',
								brandAccent: '#222',
							},
						},
					},
				}}
			/>
		</div>
	);
}
