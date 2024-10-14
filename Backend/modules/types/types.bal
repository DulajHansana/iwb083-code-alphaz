import ballerina/time;

public type User record {|
    string|() _id = ();
    string fullname;
    string email;
    string password;
    string|() websocketId = ();
    string|() jwtoken = ();
    time:Utc createdAt = time:utcNow();
|};
