# Ballerina Application Overview

This document provides an in-depth overview of a Ballerina application that utilizes various features of the Ballerina language to build a robust backend system for user authentication, message handling, and data management with MongoDB. The application showcases how Ballerina's capabilities can be effectively leveraged to create efficient, maintainable, and scalable applications.

## Ballerina Features and Their Usage

### 1. **Isolated Functions**

- **Definition**: Ballerina allows functions to be declared as isolated, ensuring that they do not share mutable state with other functions. This is crucial in concurrent environments where multiple requests may be processed simultaneously.
  
- **Usage**: All primary functions in the application (e.g., `loginUser`, `signUpUser`, `insert`, `findOne`) are defined as isolated to maintain thread safety and prevent race conditions when accessing shared resources.

### 2. **HTTP Module**

- **Definition**: The `ballerina/http` module provides functionalities for building and consuming HTTP services.

- **Usage**:
  - The application defines HTTP endpoints for user authentication (login and signup) using the `http:Response` type for sending responses back to clients.
  - Functions like `loginUser` and `signUpUser` utilize HTTP response status codes (e.g., 200, 401, 404) to communicate the outcome of operations effectively.
  - Custom error messages are sent in the HTTP response body to provide clear feedback to clients.

### 3. **WebSocket Module**

- **Definition**: The `ballerina/websocket` module facilitates real-time communication between clients and servers using the WebSocket protocol.

- **Usage**:
  - The application utilizes WebSockets to enable real-time messaging capabilities, allowing users to send and receive messages instantly without requiring HTTP polling.
  - WebSocket clients are managed to ensure that users are connected before accessing chat features. If a client is not connected, they are redirected to establish a connection first.
  - Functions can be defined to handle WebSocket events, such as when a new message is received, ensuring that messages are broadcast to all connected clients.

### 4. **MongoDB Module**

- **Definition**: The `ballerinax/mongodb` module allows seamless interaction with MongoDB, including support for CRUD operations, indexing, and aggregation.

- **Usage**:
  - The application establishes a MongoDB client connection to perform operations such as inserting, updating, retrieving, and deleting documents.
  - Functions like `insert`, `findOne`, and `removeOne` utilize MongoDB's powerful querying capabilities to handle user and message data effectively.
  - The application includes error handling for MongoDB operations to ensure that any issues (e.g., connection errors, document not found) are logged and addressed appropriately.

### 5. **Error Handling**

- **Definition**: Ballerina's error handling model is designed to manage exceptions gracefully, using constructs such as `match` and `on fail`.

- **Usage**:
  - Each function that interacts with the database or performs critical operations includes error handling to catch and respond to failures (e.g., `loginUser` checks for user existence and valid credentials).
  - The `loggerWrite` function is called to log errors and other important events, providing insights into application behavior.

### 6. **JSON Manipulation**

- **Definition**: Ballerina has built-in support for JSON, making it easy to handle structured data.

- **Usage**:
  - Request and response bodies in functions like `loginUser` and `signUpUser` are defined as `json`, allowing for easy extraction and manipulation of user data.
  - The application uses `value:ensureType` to validate incoming JSON fields, ensuring type safety and reducing runtime errors.

### 7. **Custom Data Types**

- **Definition**: Ballerina allows developers to define custom data types, enhancing code readability and type safety.

- **Usage**:
  - The `Types` module defines custom types like `User` and `Message`, encapsulating relevant attributes and behaviors for user and message entities.
  - These types are utilized throughout the application, ensuring that data structures are consistent and easy to work with.

### 8. **Logging**

- **Definition**: Ballerina supports logging mechanisms that help track application behavior and diagnose issues.

- **Usage**:
  - The `logger_writer.bal` module is responsible for logging various events, such as successful database connections, document insertions, and error occurrences.
  - The logging level is adjustable (e.g., info, error, warn), allowing developers to filter log messages based on their needs.

### 9. **Stream Processing**

- **Definition**: Ballerina supports streaming, enabling efficient processing of large datasets without loading everything into memory.

- **Usage**:
  - The `findMessages` function uses streams to retrieve messages from MongoDB, processing them in a memory-efficient manner. This is particularly useful for applications with a high volume of messages.

### 10. **Concurrency Control**

- **Definition**: Ballerina provides constructs such as locks to manage concurrent access to shared resources.

- **Usage**:
  - Locks are used in critical sections of the code (e.g., when modifying shared data structures like `documents` and `messagesDocuments`) to prevent race conditions and ensure data integrity.

## Conclusion

This Ballerina application demonstrates the power and flexibility of the Ballerina programming language in building backend services. By leveraging features such as isolated functions, HTTP handling, WebSocket communication, MongoDB integration, custom data types, error handling, and logging, the application provides a robust foundation for user authentication and message management. This architecture not only enhances maintainability but also ensures scalability and reliability, making it suitable for modern web applications.

## License

This project is licensed under the Creative Commons License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or new features to add, please feel free to open an issue or submit a pull request.

</br>
<a href="https://github.com/DulajHansana/iwb083-code-alphaz/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DulajHansana/iwb083-code-alphaz" />
</a>

## Technologies Used

- **Frontend**: NodeJS, Next, Tailwind, JavaScript, React, CSS
- **Backend**: Ballerina, MongoDB, WebSocket
- **DevOps**: Docker, GitHub Actions

#### Authentication Flow

- **JWT Authentication**: Ensures secure communication between clients and the server by using JSON Web Tokens.
- **Web Server Connection**: Utilizes WebSockets for maintaining a persistent, real-time connection that is crucial for instant messaging.
