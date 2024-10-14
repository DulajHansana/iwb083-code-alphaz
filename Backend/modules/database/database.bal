import Backend.logger_writter as LW;
import Backend.types as Types;

import ballerinax/mongodb;

isolated mongodb:Client? mongoAdmin = ();

public function initialize(string connectionString) returns boolean {
    mongodb:Client|error mongoResult = new (connection = connectionString);

    if mongoResult is error {
        LW:loggerWrite("error", "MongoDB connection not established: " + mongoResult.message());
        return false;
    } else {
        lock {
            mongoAdmin = mongoResult;
            LW:loggerWrite("info", "MongoDB connection established.");
            return true;
        }
    }
}

public function insert(string databaseName, string collectionName, map<anydata> document) returns boolean {
    mongodb:Collection|error collectionResult = collectionAccessor(databaseName, collectionName);
    if collectionResult is error {
        LW:loggerWrite("error", "Collection not found: " + collectionResult.message() + ".");
        return false;
    }

    mongodb:Collection collection = collectionResult;

    var insertResult = collection->insertOne(document);

    if insertResult is error {
        LW:loggerWrite("error", "Document insertion failed: " + insertResult.message());
        return false;
    } else {
        LW:loggerWrite("info", "Document inserted successfully. " + document.toJsonString());
        return true;
    }
}

public function insertMany(string databaseName, string collectionName, map<anydata>[] documents) returns boolean {
    mongodb:Collection|error collectionResult = collectionAccessor(databaseName, collectionName);
    if collectionResult is error {
        LW:loggerWrite("error", "Collection not found: " + collectionResult.message() + ".");
        return false;
    }

    mongodb:Collection collection = collectionResult;

    var insertResult = collection->insertMany(documents);

    if insertResult is error {
        LW:loggerWrite("error", "Document insertion failed: " + insertResult.message());
        return false;
    } else {
        LW:loggerWrite("info", "Document inserted successfully. " + documents.toJsonString());
        return true;
    }
}

public isolated function findOne(string databaseName, string collectionName, json query) returns ()|Types:User? {
    mongodb:Collection|error collectionResult = collectionAccessor(databaseName, collectionName);
    if collectionResult is error {
        LW:loggerWrite("error", "Collection not found: " + collectionResult.message() + ".");
        return null;
    }

    mongodb:Collection collection = collectionResult;

    Types:User|error|() findResult = collection->findOne(<map<json>>query);

    if findResult is error {
        LW:loggerWrite("error", "Document retrieval failed: " + findResult.message());
        return null;
    } else {
        LW:loggerWrite("info", "Document retrieved successfully. " + findResult.toJsonString());
        return findResult;
    }
}

public isolated function removeOne(string databaseName, string collectionName, json query) returns boolean {
    mongodb:Collection|error collectionResult = collectionAccessor(databaseName, collectionName);

    if collectionResult is error {
        LW:loggerWrite("error", "Collection not found: " + collectionResult.message() + ".");
        return false;
    }

    mongodb:Collection collection = collectionResult;
    var removeResult = collection->deleteOne(<map<json>>query);

    if removeResult is error {
        LW:loggerWrite("error", "Document removal failed: " + removeResult.message());
        return false;
    } else {
        LW:loggerWrite("info", "Document removed successfully. " + query.toJsonString());
        return true;
    }
}

isolated function collectionAccessor(string databaseName, string collectionName) returns mongodb:Collection|error {
    lock {
        if mongoAdmin is () {
            LW:loggerWrite("error", "MongoDB connection not established.");
            return error("MongoDB connection not established.");
        }

        mongodb:Client mongoClient = <mongodb:Client>mongoAdmin;
        mongodb:Database|error databaseResult = mongoClient->getDatabase(databaseName);
        if databaseResult is error {
            LW:loggerWrite("error", "Database not found: " + databaseResult.message() + ".");
            return error("Database not found: " + databaseResult.message() + ".");
        }
        return databaseResult->getCollection(collectionName);
    }

}
