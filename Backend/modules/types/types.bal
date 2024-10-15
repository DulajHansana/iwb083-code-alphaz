import ballerina/random;
import ballerina/time;

public type RequestRecord record {
    readonly string connection_id;
    "client"|"websocket" connection_type;
    readonly string authorization;
    readonly time:Utc timestamp = time:utcNow();
};

public type User record {
    string id = getRandomId(20);
    string tagname = getRandomId(10);
    string fullname;
    string email;
    string password;
    string|() websocketId = ();
    string|() jwtoken = ();
};

isolated function getRandomId(int length) returns string {
    string fulltext = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    string randomId = "";

    foreach int i in 0...length {
        int|error index = random:createIntInRange(0, fulltext.length() - 1);
        randomId += string:substring(fulltext, index is error? 0 : index, index is error? 0 : index + 1);
    }

    return randomId;
}