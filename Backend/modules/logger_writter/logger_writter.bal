import ballerina/io;
import ballerina/log;

isolated boolean is_logger_ready = false;

function init() returns () {
    log:Error? outputFile = log:setOutputFile("./resources/server.log", log:OVERWRITE);
    if outputFile is log:Error {
        io:println(outputFile.message());
    } else {
        lock {
            is_logger_ready = true;
        }
    }
}

public isolated function loggerWrite(string log_level, string message) returns () {
    lock {
        if !is_logger_ready {
            return;
        }
    }

    string stringResult = <string>message;

    match log_level {
        "info" => {
            io:println(`[info] ${stringResult}`);
            log:printInfo(stringResult);
        }
        "error" => {
            io:println(`[error] ${stringResult}`);
            log:printError(stringResult);
        }
        "warn" => {
            io:println(`[warn] ${stringResult}`);
            log:printWarn(stringResult);
        }
        "debug" => {
            io:println(`[debug] ${stringResult}`);
            log:printDebug(stringResult);
        }
    }
}
