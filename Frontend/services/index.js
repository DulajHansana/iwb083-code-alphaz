// Use the native WebSocket API to connect to the Ballerina WebSocket server
const socket = new WebSocket('ws://localhost:21003/ws');

// Log connection status
socket.onopen = () => {
	console.log("Connected to WebSocket servear");
	socket.send(socket.protocol);
};

// Handle messages received from the server
socket.onmessage = (event) => {
	console.log("Message from server: ", event.data);
};

// Handle connection close
socket.onclose = () => {
	console.log("Connection closed");
};

// Handle any errors
socket.onerror = (error) => {
	console.error("WebSocket error: ", error);
};

export default socket;
