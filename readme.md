# Real-Time Chat Application

A modern web-based chat application that enables instant communication through a sleek and responsive interface. Built using **Ballerina** for efficient WebSocket handling and **Next.js/React** for a dynamic frontend, this app supports real-time messaging, user notifications, and chat room management.

### Key Features:
- **Real-Time Messaging**: Enjoy instant communication with WebSocket integration.
- **User Notifications**: Get real-time updates when users join or leave the chat.
- **Responsive Design**: Optimized for seamless use on various devices.
- **Scalable Architecture**: Designed to handle multiple users and high traffic efficiently.

Perfect for teams, communities, or casual conversations, this application showcases modern web development practices while providing a robust communication tool.

## License

This project is licensed under the Creative Common License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or new features to add, please feel free to open an issue or submit a pull request.
</br></br>
<a href="https://github.com/DulajHansana/iwb083-code-alphaz/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DulajHansana/iwb083-code-alphaz" />
</a>



# Spark Chat Backend Architecture

## Overview

The Spark Chat backend is crafted to ensure robust, scalable, and efficient messaging. Utilizing **Ballerina** for its exceptional cloud-native support and seamless API integration, our system is split into two main services: the **Server** and the **Web Server**.

## Key Components

### Authentication and Initial Connection

- **Connecting Screen**: Upon entry, users encounter a 'Connecting...' screen.
- **JWT Handling**: The frontend initiates a secure request to the Server with a JSON Web Token (JWT).
- **Token Validation**: On valid authentication, an 'allow' token is issued, critical for subsequent secure interactions.

### Web Server Interaction

- **WebSocket Connection**: Post-authentication, users connect via WebSockets, enabling real-time communications.
- **Get Started Page**: After a successful connection, users proceed to the 'Get Started' page to log in.

### Modular Backend with Ballerina

- **Database Module**: Manages MongoDB connections for robust data interaction.
- **WebSocket Module**: Ensures real-time data transfer and instant message delivery.
- **Logger and Types Modules**: Aid in system monitoring and data consistency.
- **WS Provider and DB Action Dispatcher Modules**: Facilitate message routing and database operations.
- **JWT Module**: Oversees all JWT-related functionalities.

## Real-Time Data Handling and Synchronization

- **Login Validation**: Users are prompted to sign up if credentials are not recognized.
- **Message Sync**: Real-time synchronization through WebSockets ensures that messages are updated across devices instantly.

## Cloud Services and MongoDB Integration

- **Cloud-Based MongoDB**: Serves as the backbone for storing user data and chat histories.
- **Security and Efficiency**: Ballerina handles secure data exchanges, enhancing performance and scalability.

## Enhancements and Style

- **Progress Indicators**: A progress bar visually indicates synchronization status.
- **Message Management**: Messages are managed and synchronized efficiently, ensuring seamless user interactions.

## Conclusion

By leveraging Ballerina's microservices architecture and MongoDB's effective data handling, Spark Chat's backend is optimized for a growing user base, providing a scalable and efficient platform for real-time messaging.

---

For more information on our technology stack and development practices, visit our [Wiki](#) or check out our [Issue Tracker](#) to see upcoming features and releases.
