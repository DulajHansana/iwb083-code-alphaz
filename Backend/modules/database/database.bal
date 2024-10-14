import Backend.logger_writter as LW;
import ballerinax/mongodb;

public isolated function initialize(string connectionString) returns boolean {
    mongodb:Client|error mongoDb = new (connection = connectionString);

    if mongoDb is error {
        LW:loggerWrite("error", mongoDb.message());
        return false;
    } else {
        LW:loggerWrite("info", "MongoDB connection established.");
        return true;
    }

}
