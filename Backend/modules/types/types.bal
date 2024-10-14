public type User record {|
    string fullname;
    string email;
    string password;
    string|() websocketId = ();
    string|() jwtoken = ();
|};
