"use client";
import { serverAuthorization, serverLogin, serverSignup } from "./actions";
var serverAuth = undefined;
var serverLoginDetails = undefined;

export class WebSocketClient {
	constructor() {
		this.socket = new WebSocket("ws://localhost:21003/ws");
		this.socket.addEventListener("message", (event) => {
			const response = JSON.parse(event.data)
			const sendDatetime = new Date(response.messageId);
			console.log("You sent this message on:", sendDatetime);
		});
	}

	getStatus() {
		return this.socket.CONNECTING;
	}

	sendMessage(message) {
		const data = {
			messageId: Date.now(),
			message: message,
			...serverLoginDetails
		}
		
		this.socket.send(JSON.stringify(JSON.parse(JSON.stringify(data))));
	}
	
	onOpen(callback) {
		this.socket.addEventListener("open", (event) => {
			callback(event);
		});
	}
	
	onMessage(callback) {
		this.socket.addEventListener("message", (event) => {
			console.log(event.data)
		});
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