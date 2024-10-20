# Ballerina Logging Utility

This Ballerina module provides a simple logging utility for writing log messages to a specified file as well as printing them to the console. It supports various log levels, including information, warnings, errors, and debug messages.

## Key Components

### 1. **State Variable**
- `isolated boolean is_logger_ready`
  - This variable indicates whether the logger has been successfully initialized and is ready to log messages. It starts as `false` and is set to `true` upon successful initialization.

### 2. **Initialization Function (`init`)**
- **Function Signature**: `function init() returns ()`
- This function initializes the logging system:
  - It attempts to set the output file for logs to `./resources/server.log` using the `log:setOutputFile()` function with the `log:OVERWRITE` option to replace any existing logs.
  - If an error occurs during this process, the error message is printed to the console.
  - If initialization is successful, the `is_logger_ready` variable is set to `true` within a lock to ensure thread safety.

### 3. **Logging Function (`loggerWrite`)**
- **Function Signature**: `public isolated function loggerWrite(string log_level, string message) returns ()`
- This function writes log messages based on the specified log level:
  - It first checks if the logger is ready by evaluating `is_logger_ready`. If the logger is not ready, the function returns without logging.
  - The function takes two parameters:
    - `log_level`: A string representing the log level (e.g., "info", "error", "warn", "debug").
    - `message`: The message to be logged.
  - It uses a `match` statement to determine the log level and performs the following actions:
    - **Info**: Logs the message as an informational entry.
    - **Error**: Logs the message as an error entry.
    - **Warn**: Logs the message as a warning entry.
    - **Debug**: Logs the message for debugging purposes.
  - For each log level, it prints the message to the console and writes the message to the log file using the appropriate logging function (`log:printInfo`, `log:printError`, `log:printWarn`, `log:printDebug`).

## Conclusion

This logging utility is designed to facilitate easy logging within a Ballerina application. It supports different log levels, allowing developers to categorize log messages for better monitoring and debugging. By utilizing an output file, it provides persistent logging that can be reviewed later.
