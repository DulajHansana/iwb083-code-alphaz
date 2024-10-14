import ballerina/uuid;

public type User record {
    string id = uuid:createRandomUuid();
    string fullname;
    string email;
    string password;
    string|() websocketId = ();
    string|() jwtoken = ();
};
