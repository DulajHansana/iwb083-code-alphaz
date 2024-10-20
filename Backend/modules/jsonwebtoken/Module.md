# `verifyToken` Function

This function verifies a JSON Web Token (JWT) received in the authorization header. It extracts the token from the header, configures the validation settings using a specified secret, and then validates the token.

## Parameters

- **`authHeader`**: `string`
  - The authorization header containing the JWT, which typically starts with the "Bearer " prefix. The function expects this prefix and extracts the token from it.

- **`jwtSecret`**: `string`
  - The secret key used to validate the signature of the JWT. This key should be kept confidential and secure.

## Returns

- **`jwt:Error | jwt:Payload`**
  - The function returns either:
    - An instance of `jwt:Payload` if the token is valid, containing the decoded payload of the JWT.
    - An instance of `jwt:Error` if the token validation fails, providing details about the validation error.

## Function Logic

1. **Extract JWT**: The function extracts the JWT from the `authHeader` by removing the first 7 characters (the length of the "Bearer " prefix).
   
2. **Configure Validator**: It sets up the signature configuration using the provided `jwtSecret` and initializes the validator configuration with this signature configuration.

3. **Validate Token**: The `jwt:validate` function is called with the extracted token and the configured validator. This checks the token's integrity and validity based on its signature.

## Usage

This function is typically used in authentication mechanisms to ensure that a JWT provided by a client is valid before granting access to protected resources.
