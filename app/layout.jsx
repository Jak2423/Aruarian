'use client';

import './globals.css';
import { Poppins } from '@next/font/google';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Navbar from './Navbar';
import { useState } from 'react';

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['400', '500', '700'],
});

export default function RootLayout({ children }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<html lang='en'>
			<head />
			<body className={`${poppins.variable} font-poppins max-w-6xl w-full mx-auto`}>
				<SessionContextProvider supabaseClient={supabaseClient}>
					<Navbar />
					{children}
				</SessionContextProvider>
			</body>
		</html>
	);
}
