import { MessageProvider } from "@/contexts/MessageContext";
import { UserProvider } from "@/contexts/UserProfile";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

function MyApp({ Component, pageProps }) {
	return (
		<WebSocketProvider>
			<UserProvider>
				<MessageProvider>
					<Component {...pageProps} />
				</MessageProvider>
			</UserProvider>
		</WebSocketProvider >
	);
}

export default MyApp;
