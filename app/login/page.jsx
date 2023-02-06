'use client';

import { getURL } from '@/utils/helpers';
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
				redirectTo={getURL()}
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: '#ff7991',
								brandAccent: '#ff7991',
								inputLabelText: '#fffaf9',
							},
						},
						dark: {
							colors: {
								brandButtonText: '#2e384e',
								inputBorderHover: '#ff7991',
								inputBorderFocus: '#ff7991',
								anchorTextColor: '#fffaf9',
								anchorTextHoverColor: '#ff7991',
							},
						},
					},
				}}
				theme='dark'
			/>
		</div>
	);
}
