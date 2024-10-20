"use client";
import { serverAuthorization, serverLogin, serverSignup } from "./actions";
var serverAuth = undefined;
var serverLoginDetails = undefined;
var preLoadingMessages = {};

export class WebSocketClient {
	constructor() {
		this.socket = new WebSocket("ws://localhost:21003/ws");
		this.socket.addEventListener("open", (event) => this.onOpen(event));
		this.socket.addEventListener("message", (event) => this.onMessage(event));
		this.readyState = this.socket.readyState;
		this.preLoadingCount = 0;
	}

	clientDetails() {
		return serverLoginDetails;
	}

	syncMessages(callback) {
		const data = {
			messageType: "#email",
			...serverLoginDetails
		};
		this.socket.send(JSON.stringify(data));
		this.preMessagesSyncCallback = callback;
	}

	startHeartbeat() {
		this.pingInterval = setInterval(() => {
			if (serverLoginDetails !== undefined && this.socket.readyState === WebSocket.OPEN) {
				this.sendMessage("#ping", "ping");
			}
		}, 5000)
	}

	sendMessage(messageType, message, rxEmail) {
		if (serverLoginDetails !== undefined && Object.keys(serverLoginDetails).length !== 0) {
			const data = {
				messageType: messageType !== undefined ? messageType : "usermessage",
				messageId: Date.now(),
				message: message,
				rxEmail: rxEmail,
			...serverLoginDetails
			}

			this.socket.send(JSON.stringify(JSON.parse(JSON.stringify(data))));
		} else {
			window.location.href = "/";
		}
	}

	onOpen(callback) {
		this.readyState = this.socket.readyState;
		this.startHeartbeat();
		this.socket.addEventListener("open", (event) => {
			if (callback !== undefined) {
				callback(event);
			}
		})
	}

	close() { 
		this.socket.close();
	}

	onMessage(event) {
		const response = JSON.parse(event.data);

		if (response.code === 703) { // When server return user's pre-messages
			this.preLoadingCount = response.value;
		}

		if (response.code === 704) { // A pre-message is recieved
			preLoadingMessages[response.value.id] = response.value;

			this.preLoadingCount === 0 ? (this.preLoadingCount = 1) : this.preLoadingCount;
			const progress = (Object.keys(preLoadingMessages).length / this.preLoadingCount) * 100;

			const currentProgress = this.currentProgress || 0;
			const targetProgress = progress;

			let interval = setInterval(() => {
				if (this.currentProgress >= targetProgress) {
					clearInterval(interval);
				} else {
					this.currentProgress = Math.min(this.currentProgress + 1, targetProgress);
					this.preMessagesSyncCallback(preLoadingMessages, isNaN(this.currentProgress) ? 0 : this.currentProgress);
				}
			}, 100);

			if (targetProgress === 100) {
				setTimeout(() => {
					preLoadingMessages = {};
					this.preLoadingCount = 0;
					this.currentProgress = 0;
				}, 1000);
			}
		}

		if (response.state === 705 && serverLoginDetails !== undefined) { // A ping-pong message received
			this.sendMessage("#pong", "pong");
		}
	}

	onError(callback) {
		this.socket.addEventListener("error", (event) => {
			callback(event);
		});
	}
}

export async function handleServerAuthorization() {
	serverAuth = await serverAuthorization();
	return serverAuth.accepted;
}


export async function handleServerLogin(credentials) {
	serverAuth === undefined ? await handleServerAuthorization() : null;
	const response = await serverLogin(credentials, serverAuth?.aliveToken || "");

	if (response?.status === 202) {
		serverLoginDetails = response.body;
		return {
			code: 202,
			user: response.body,
		};
	} else {
		return {
			code: response?.status || 500,
			message: response?.message || "Internal Server Error",
		}
	}
}

export async function handleServerSignup(credentials) {
	serverAuth === undefined ? await handleServerAuthorization() : null;

	const response = await serverSignup(credentials, serverAuth?.aliveToken || "");

	if (response?.status === 202) {
		return {
			code: 202,
			user: response.body,
		};
	} else {
		return {
			code: response?.status || 500,
			message: response?.message || "Internal Server Error", // Fail reason can be accessed from response, can be used to present to user:nivindulakshitha
		}
	}
}

/* 
var client = new WebSocketClient();
client.onOpen(() => {
	console.log("Client connected!");
})

client.syncMessages((preMessages, syncingProgress) => { // preMessages has user's old messages, syncingProgress has how much messages are retrieved
})

client.sendMessage("Hello Ballerina!");


handleServerLogin({ fullname: "Admin", email: "admin@localhost", password: "admin" }).then(res => {
	console.log(res) // see the response for more details
});

handleServerSignup({ fullname: "Admin", email: "admin@localhost", password: "admin" }).then(res => {
	console.log(res) // see the response for more details
});
*/