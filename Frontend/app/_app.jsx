import { WebSocketProvider } from "@/contexts/WebSocketContext";

function MyApp({ Component, pageProps }) {
	return (
		<WebSocketProvider>
			<Component {...pageProps} />
		</WebSocketProvider>
	);
}

export default MyApp;
