import jwt from "jsonwebtoken";

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

export const connect = async () => {
	let readyState = false;
		
	const response = await fetch("http://localhost:8080/authorize", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + jwtTokenGenerator()
		}
	});
	
	return {
		severHandshake: {
			code: response.status,
			accepted: response.statusText == "Accepted",
		},
		serverResponse: response
	};
}

function jwtTokenGenerator() {
	const payload = {
		username: "Someone",
		id: 1,
		email: "Q5TJt@example.com",
	};

	const jwToken = jwt.sign(payload, process.env.JWT_SECRET);

	return jwToken;
}

console.log(await connect());