fetch("http://localhost:8080/hsrequest", headers = {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		"Upgrade": "websocket",
		"Connection": "upgrade",
		"Sec-WebSocket-Key": "dGhlIHNhbXBsZSBub25jZQ==",
		"Sec-WebSocket-Version": "13"
	}
}).then(response => {
	console.log(response);
}).catch(error => {
	console.log(error);
});