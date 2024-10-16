import { jwtProvider } from "./actions";
export var socket = new WebSocket(null);

export class WebSocketTrigger {
	/**
	 * Event handler for when the WebSocket connection is established.
	 * @param {function} callback - Called when the WebSocket connection is established.
	 * @example
	 * const wsTrigger = new WebSocketTrigger();
	 * wsTrigger.onOpen((event) => {
	 *     console.log("WebSocket connection established.");
	 * });
	 */
	onOpen(callback) {
		socket.addEventListener("open", (event) => {
			callback(event);
		});
	}

	/**
	 * Event handler for when the WebSocket connection receives a message.
	 * @param {function} callback - Called when the WebSocket connection receives a message.
	 * @example
	 * const wsTrigger = new WebSocketTrigger();
	 * wsTrigger.onMessage((message) => {
	 *     console.log(`Received message: ${message}`);
	 * });
	 */
	onMessage(callback) {
		socket.addEventListener("message", (event) => {
			callback(event.data);
		});
	}


	/**
	 * Event handler for when the WebSocket connection is closed.
	 * @param {function} callback - Called when the WebSocket connection is closed.
	 * @example
	 * const wsTrigger = new WebSocketTrigger();
	 * wsTrigger.onClose((event) => {
	 *     console.log("WebSocket connection closed.");
	 * });
	 */
	onClose(callback) {
		socket.addEventListener("close", (event) => {
			callback(event);
		});
	}

	/**
	 * Event handler for when the WebSocket connection encounters an error.
	 * @param {function} callback - Called when the WebSocket connection encounters an error.
	 * @example
	 * const wsTrigger = new WebSocketTrigger();
	 * wsTrigger.onError((error) => {
	 *     console.error(`WebSocket error: ${error}`);
	 * });
	 */
	onError(callback) {
		socket.addEventListener("error", (event) => {
			callback(event);
		});
	}
}

export default async function authFirst() {
	return await jwtProvider()
}