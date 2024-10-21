import { MessageProvider } from "@/contexts/MessageContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

function MyApp({ Component, pageProps }) {
	return (
		<WebSocketProvider>
			<MessageProvider>
				<Component {...pageProps} />
			</MessageProvider>
		</WebSocketProvider >
	);
}

export default MyApp;
