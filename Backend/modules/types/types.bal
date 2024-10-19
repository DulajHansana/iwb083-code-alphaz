import ballerina/http;
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
    string? avatar;
    string|() websocketId = ();
    string|() jwtoken = ();
};

public type Message record {|
    int id;
    string rxId;
    string message;
    string|int timestamp = getThisTime();
|};

public isolated function getStateCode(string state) returns string {
    match string:toLowerAscii(state) {
        "601" => {
            return "recieved";
        }
        "602" => {
            return "stored";
        }
        "603" => {
            return "sent";
        }
        "604" => {
            return "delivered";
        }
        "605" => {
            return "seen";
        }
        "606" => {
            return "deleted";
        }
        "607" => {
            return "failed";
        }
        "701" => {
            return "#pingpong";
        }
        "702" => {
            return "#online";
        }
        "703" => {
            return "#email";
        }
        "704" => {
            return "#message";
        }

        "705" => {
            return "#pingpong";
        }
        _ => {
            return "unknown";
        }
    }
};

public type MessageState record {|
    int messageId;
    601|602|603|604|605|606|607 state; // 601 = received, 602 = stored, 603 = sent, 604 = delivered, 605 = seen, 606 = deleted, 607 = failed 
    "recieved"|"stored"|"sent"|"delivered"|"seen"|"deleted"|"failed"|"unknown" stateText;
    string|null stateDescription;
|};

public type SystemMessage record {|
    701|702|703|704|705 code;
    string message;
    any|() value;
|};

isolated function getRandomId(int length) returns string {
    string fulltext = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    string randomId = "";

    foreach int i in 0 ... length {
        int|error index = random:createIntInRange(0, fulltext.length() - 1);
        randomId += string:substring(fulltext, index is error ? 0 : index, index is error ? 0 : index + 1);
    }

    return randomId;
}

isolated function getThisTime() returns string|int {
    time:Utc now = time:utcNow();
    int timestamp = now[0] + <int>now[1];
    return timestamp;
}

public isolated function getProfilePicture(string username, int gender = 1) returns string? {
    http:Client|http:ClientError apiFetch = new ("https://avatar.iran.liara.run/");
    if apiFetch is http:Client {
        string url = string `username?username=${username.toString()}`;
        string|http:ClientError data = apiFetch->get(url);
        if data is string {
            return "https://avatar.iran.liara.run" + url;
        }
    }

    return null;
}
