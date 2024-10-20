This module handles user authentication and message management in a backend service. It provides functions for logging in users, signing up new users, retrieving user information, and managing messages.

## Functions

### `loginUser(json requestBody) returns http:Response`

Handles user login by validating credentials against the database.

#### Parameters

- **`requestBody`**: `json`
  - The request body containing user login information, specifically `email` and `password`.

#### Returns

- **`http:Response`**
  - Returns an HTTP response indicating the result of the login attempt, which includes:
    - `404`: User not found.
    - `401`: Invalid credentials.
    - `202`: Successful login with user details in JSON format.

---

### `signUpUser(json requestBody) returns http:Response`

Handles user registration by checking if the user already exists and, if not, inserting a new user into the database.

#### Parameters

- **`requestBody`**: `json`
  - The request body containing user signup information, including `fullname`, `email`, and `password`.

#### Returns

- **`http:Response`**
  - Returns an HTTP response indicating the result of the signup attempt, which includes:
    - `409`: User already exists.
    - `202`: Successful sign-up with user details in JSON format.
    - `400`: Invalid request body.

---

### `getUser(string email) returns Types:User?`

Retrieves user information based on the provided email.

#### Parameters

- **`email`**: `string`
  - The email address of the user to retrieve.

#### Returns

- **`Types:User?`**
  - Returns the user details if found, or `null` if the user does not exist.

---

### `sendMessage(string email, Types:Message message) returns boolean`

Sends a message by inserting it into the messages database.

#### Parameters

- **`email`**: `string`
  - The email address of the recipient.
  
- **`message`**: `Types:Message`
  - The message object containing the details to be sent.

#### Returns

- **`boolean`**
  - Returns `true` if the message was successfully sent; otherwise, returns `false`.

---

### `totalMessages(string txEmail) returns int`

Counts the total number of messages for a specified user.

#### Parameters

- **`txEmail`**: `string`
  - The email address of the user whose messages are to be counted.

#### Returns

- **`int`**
  - Returns the total number of messages associated with the user.

---

### `retrieveMessages(string txEmail) returns Types:Message[]?`

Retrieves all messages for a specified user.

#### Parameters

- **`txEmail`**: `string`
  - The email address of the user whose messages are to be retrieved.

#### Returns

- **`Types:Message[]?`**
  - Returns an array of messages if found, or `null` if no messages exist for the user.

---

## Overview

This module leverages a database interface (`DB`) to manage user data and messages, along with a logging utility (`LW`) to track errors and important events. It provides a structured approach to user authentication and message handling within the application.
