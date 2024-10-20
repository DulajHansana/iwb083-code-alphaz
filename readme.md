# Real-Time Chat Application

A modern web-based chat application that enables instant communication through a sleek and responsive interface. Built using **Ballerina** for efficient WebSocket handling and **Next.js/React** for a dynamic frontend, this app supports real-time messaging, user notifications, and chat room management.

### Key Features:
- **Real-Time Messaging**: Enjoy instant communication with WebSocket integration.
- **User Notifications**: Get real-time updates when users join or leave the chat.
- **Responsive Design**: Optimized for seamless use on various devices.
- **Scalable Architecture**: Designed to handle multiple users and high traffic efficiently.

Perfect for teams, communities, or casual conversations, this application showcases modern web development practices while providing a robust communication tool.

## License

This project is licensed under the Creative Commons License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or new features to add, please feel free to open an issue or submit a pull request.

</br></br>
<a href="https://github.com/DulajHansana/iwb083-code-alphaz/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DulajHansana/iwb083-code-alphaz" />
</a>

---

# How to Run

### Prerequisites:
1. **Docker**: Ensure Docker is installed on your machine. You can download it [here](https://www.docker.com/get-started).
2. **Node.js & npm**: Ensure that Node.js and npm are installed for building the React app. You can download Node.js [here](https://nodejs.org/).
3. **Ballerina**: Ensure you have Ballerina installed. You can download it [here](https://ballerina.io/).
4. **Git**: Ensure Git is installed to clone the repository. Get it [here](https://git-scm.com/).

### Steps to Run the Application:

1. **Clone the Repository**:
   Clone your repository using Git:
   ```bash
   git clone https://github.com/DulajHansana/iwb083-code-alphaz.git
   cd iwb083-code-alphaz
2. **Docker Setup**:
   If your project has a <b>docker-compose.yml</b> or <b>Dockerfile</b>, you can build and start the services using Docker.<br>
   If using <b>docker-compose.yml</b>,
    execute:
      ```bash
        docker-compose up --build
      ````
    If there's only a <b>Dockerfile</b>, build and run the Docker image manually:

3. **Frontend (React) Setup**: Navigate to the frontend directory (if applicable), then install dependencies and start the React app
    ```bash
       cd frontend  # Or wherever the React app is located
       npm install
       npm start
      ````
    This should start the React app on http://localhost:3000.
4. **Backend (Ballerina) Setup**: Navigate to the backend directory where the Ballerina code is located and run the Ballerina service
   ```bash
     cd backend  # Or the location of Ballerina code
     ballerina run service.bal
      ````
   This should start the backend on http://localhost:8080.
5.  **Access the Web App**: The application should be accessible at http://localhost:3000 for the frontend, with API requests routed to http://localhost:8080 (Ballerina backend).
6.  **Docker for Production**: If the Docker setup is for production, make sure you're correctly using multi-stage builds and that environment variables are correctly passed.

