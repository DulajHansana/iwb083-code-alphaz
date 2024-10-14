import jwt from "jsonwebtoken";
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

export const serverAuthorization = async (credentials) => {
	const response = await fetch(`${process.env.SERVICE_SERVER_URL}/authorize`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + jwTokensGenerator(credentials)
		}
	});

	return {
		severAthorization: {
			code: response.status,
			accepted: response.statusText === "Accepted",
			aliveToken: response.headers.get("keep-alive-token") || null
		},
		serverResponse: response
	};
}

const jwTokensGenerator = (credentials) => {
	const { username, id, email } = credentials;

	const payload = {
		username: username,
		id: id,
		email: email,
	};

	const jwToken = jwt.sign(payload, process.env.JWT_SECRET);

	return jwToken;
}

console.log(await serverAuthorization(
	{
		username: "admin",
		id: "123",
		email: "admin@localhost",
	}
).catch(error => console.log(error)));