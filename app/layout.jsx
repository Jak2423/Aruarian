import './globals.css';
import SupabaseProvider from './components/supabase-provider';
import { Poppins } from '@next/font/google';
import Navbar from './components/Navbar';

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['400', '500', '700'],
});

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head />
			<body className={`${poppins.variable} font-poppins max-w-6xl w-full mx-auto`}>
				<SupabaseProvider>
					<Navbar />
					{children}
				</SupabaseProvider>
			</body>
		</html>
	);
}
