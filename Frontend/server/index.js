"use client";
import { serverAuthorization, serverLogin, serverSignup } from "./actions";

export class WebSocketClient {
	constructor() {
		this.socket = new WebSocket("ws://localhost:21003/ws");
	}
	
	onOpen(callback) {
		this.socket.addEventListener("open", (event) => {
			callback(event);
		});
	}
	
	onMessage(callback) {
		this.socket.addEventListener("message", (event) => {
			callback(event.data);
		});
	}

	onError(callback) {
		this.socket.addEventListener("error", (event) => {
			callback(event);
		});
	}
}

var serverAuth = undefined;
var serverLoginDetails = undefined;

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