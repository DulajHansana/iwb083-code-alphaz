import "./globals.css";
import { Lato } from 'next/font/google'

const lato = Lato({ subsets: ['latin'], weight: ['100', '300', '400', '700'] })

export const metadata = {
	title: "Spark Chat",
	description: "Real-Time Chat Application",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" encoding="UTF-8">
			<link rel="icon" href="/icons/favicon.png" sizes="any" />
			<link rel="shortcut icon" href="/icons/favicon.ico" sizes="any" />
			<link rel="icon" type="image/x-icon" href="/icons/favicon.ico" sizes="any" />
			<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes="any" />
			<body className={`${lato.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
