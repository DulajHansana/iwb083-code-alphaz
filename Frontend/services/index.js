export const socket = new WebSocket(null);

socket.addEventListener("open", () => {
	console.log("WebSocket connection opened");
})

socket.addEventListener("message", (event) => {
	console.log("Received message:", event.data);
});

socket.addEventListener("close", () => {
	console.log("WebSocket connection closed");
});

socket.addEventListener("error", (error) => {
	console.error("WebSocket error:", error);
});
