import Backend.database as DB;
import Backend.logger_writter as LW;
import Backend.types as Types;

import ballerina/http;

public isolated function loginUser(json requestBody) returns http:Response {
    http:Response response = new;

    Types:User|null loginResult = null;
    do {

        json query = {
            "email": check requestBody.email
        };

        if DB:count("users", "users", query) == 0 {
            response.statusCode = 404;
            response.reasonPhrase = "User not found. Sign up to continue.";
            LW:loggerWrite("error", "User not found.");
            return response;
        }

        query = {
            "email": check requestBody.email,
            "password": check requestBody.password
        };

        loginResult = DB:findOne("users", "users", query);

        if loginResult is Types:User {
            response.statusCode = 202;
            response.reasonPhrase = "Successful login.";
            response.setJsonPayload(loginResult.toJson());
            return response;
        } else {
            response.statusCode = 401;
            response.reasonPhrase = "Invalid credentials. Please try again.";
            return response;
        }

    } on fail var e {
        response.statusCode = 400;
        response.reasonPhrase = "Invalid request body. Please try again.";
        LW:loggerWrite("error", e.message());
        return response;
    }
}

public isolated function signUpUser(json requestBody) returns http:Response {
    http:Response response = new;

    boolean|Types:User|null signUpResult = null;

    do {

        json searchQuery = {
            "email": check requestBody.email
        };

        if DB:count("users", "users", searchQuery) > 0 {
            response.statusCode = 409;
            response.reasonPhrase = "User already exists. Login to continue.";
            LW:loggerWrite("error", "User already exists.");
            return response;
        }

        map<anydata> insertQuery = {
            "fullname": check requestBody.fullname,
            "email": check requestBody.email,
            "password": check requestBody.password
        };

        signUpResult = DB:insert("users", "users", insertQuery);

        if signUpResult is boolean {
            response.statusCode = 202;
            response.reasonPhrase = "Successful sign up.";
            return response;
        } else {
            response.statusCode = 400;
            response.reasonPhrase = "Invalid request body. Please try again.";
            return response;
        }

    } on fail var e {
        response.statusCode = 400;
        response.reasonPhrase = "Invalid request body. Please try again.";
        LW:loggerWrite("error", e.message());
        return response;
    }
}

public isolated function sendMessage(string txEmail, Types:Message message) returns boolean {
    do {
        boolean insertResult = DB:insert("messages", txEmail, message);

        return insertResult;

    } on fail var e {
        LW:loggerWrite("error", "DAD: sendMessage " + e.message());
        return false;
    }

}
