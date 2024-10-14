import ballerina/random;
import ballerina/uuid;

public type User record {
    string id = uuid:createRandomUuid();
    string tagname = getRandomId();
    string fullname;
    string email;
    string password;
    string|() websocketId = ();
    string|() jwtoken = ();
};

public isolated function getRandomId() returns string {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    int length = 10;
    string randomId = "";

    foreach int i in 0...length {
        int|error index = random:createIntInRange(0, alphabet.length() - 1);
        randomId += string:substring(alphabet, index is error? 0 : index, index is error? 0 : index + 1);
    }

    return randomId;
}
