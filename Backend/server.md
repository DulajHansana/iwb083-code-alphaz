# Ballerina Server Implementation

This Ballerina application provides both HTTP and WebSocket services, using JWT-based authentication, database interaction, and a logging system. Below is an overview of its core functionalities:

## Core Functionality Overview

### 1. **Database Initialization and Logging**
   - The server initializes by connecting to a configured database and logging the server's startup. This ensures the backend database is ready for processing user requests.
   - A logger is employed throughout the system to track both informational events (such as successful requests) and errors.

### 2. **HTTP Service**
   - The HTTP service listens on port `8080` and handles requests for various endpoints. It supports:
     - **Root Endpoint**: A simple GET request that returns an HTTP `202 Accepted` status to indicate the server is running.
     - **Authorization Endpoint**: Validates the incoming request's JWT token from the `Authorization` header. If valid, it returns a `202 Accepted` response with a unique token to keep the session alive. Invalid tokens or missing headers result in a `403 Forbidden` response.
     - **Login and Signup Endpoints**: Handle user authentication and registration. These endpoints check whether the WebSocket connection is active (for real-time interaction) and ensure the request body is valid before proceeding with login or signup actions.

### 3. **JWT Token Authentication**
   - JWT tokens are validated for authentication purposes. The `Authorization` header must contain a valid Bearer token for successful requests. If authentication fails, appropriate error messages are logged, and a forbidden response is returned.

### 4. **Request Management**
   - Requests are managed via a table structure that stores connection information (e.g., `connection_id`, authorization status). This table keeps track of active connections and ensures only alive connections can perform actions like login or signup.

### 5. **WebSocket Service**
   - The WebSocket service listens on a separate port (`21003`) for real-time communication. It handles WebSocket upgrade requests and establishes a persistent connection between the client and the server.
   - If the handshake request for WebSocket is valid, a WebSocket service is created to manage the connection. Invalid requests are rejected with appropriate error handling.

### 6. **Session Management**
   - To keep connections alive, a unique token is generated for each authorized session. This token is sent back in the response headers and is required for subsequent requests (e.g., login and signup).
   - The system verifies if a connection is still alive before allowing further actions, ensuring secure and valid interactions throughout the session.

### 7. **Logging**
   - Logging plays a crucial role in both success and error handling. All key events, such as successful authorization, invalid requests, and WebSocket activity, are logged for monitoring and debugging purposes.
