import Backend.logger_writter as LW;

import ballerinax/mongodb;

mongodb:Client? mongoAdmin = ();

public function initialize(string connectionString) returns boolean {
    mongodb:Client|error mongoResult = new (connection = connectionString);

    if mongoResult is error {
        LW:loggerWrite("error", "MongoDB connection not established: " + mongoResult.message());
        return false;
    } else {
        mongoAdmin = mongoResult;
        LW:loggerWrite("info", "MongoDB connection established.");
        return true;
    }
}

public function insert(string databaseName, string collectionName, map<anydata> document) returns boolean {
    if mongoAdmin is () {
        LW:loggerWrite("error", "MongoDB connection not established. Document insertion failed.");
        return false;
    }

    mongodb:Client mongoClient = <mongodb:Client>mongoAdmin;
    mongodb:Database|error databaseResult = mongoClient->getDatabase(databaseName);
    if databaseResult is error {
        LW:loggerWrite("error", "Database not found: " + databaseResult.message() + ". Document insertion failed.");
        return false;
    }

    mongodb:Collection|error collectionResult = databaseResult->getCollection(collectionName);
    if collectionResult is error {
        LW:loggerWrite("error", "Collection not found: " + collectionResult.message() + ". Document insertion failed.");
        return false;
    }

    mongodb:Collection collection = collectionResult;

    var insertResult = collection->insertOne(document);
    if insertResult is error {
        LW:loggerWrite("error", "Document insertion failed: " + insertResult.message());
        return false;
    } else {
        LW:loggerWrite("info", "Document inserted successfully." + insertResult.toJsonString());
        return true;
    }
}
