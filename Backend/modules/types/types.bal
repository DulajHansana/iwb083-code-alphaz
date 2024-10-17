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

public type Message record {|
    int id;
    string rxId;
    string message;
    string timestamp = getThisTime();
|};

public isolated function getStateCode(string state) returns string {
    match string:toLowerAscii(state) {
        "601" => {return "recieved";}
        "602" => {return "sent";}
        "603" => {return "seen";}
        "604" => {return "deleted";}
        "605" => {return "failed";}
        _ => {return "unknown";}
    }
};

public type MessageState record {|
    int messageId;
    601|602|603|604|605 state; // 601 = received, 602 = sent, 603 = seen, 604 = deleted, 605 = failed
    "recieved"|"sent"|"seen"|"deleted"|"failed"|"unknown" stateText;
    string|null stateDescription;
|};

isolated function getRandomId(int length) returns string {
    string fulltext = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    string randomId = "";

    foreach int i in 0...length {
        int|error index = random:createIntInRange(0, fulltext.length() - 1);
        randomId += string:substring(fulltext, index is error? 0 : index, index is error? 0 : index + 1);
    }

    return randomId;
}

isolated function getThisTime() returns string {
    time:Utc now = time:utcNow();
    return now.toString();
}