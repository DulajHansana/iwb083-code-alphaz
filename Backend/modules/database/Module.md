# `database.bal`

This module provides a set of functions to manage MongoDB connections, collections, and documents. It includes functions for initializing the connection, creating collections, inserting documents, and querying data.

## Functions

### `initialize(string connectionString) returns boolean`

Establishes a connection to the MongoDB database.

#### Parameters

- **`connectionString`**: `string`
  - The connection string for connecting to the MongoDB server.

#### Returns

- **`boolean`**
  - Returns `true` if the connection is established successfully; otherwise, returns `false`.

---

### `createCollection(string databaseName, string collectionName) returns boolean`

Creates a new collection in the specified database.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database where the collection will be created.
  
- **`collectionName`**: `string`
  - The name of the collection to be created.

#### Returns

- **`boolean`**
  - Returns `true` if the collection is created successfully; otherwise, returns `false`.

---

### `insert(string databaseName, string collectionName, map<anydata> document) returns boolean`

Inserts a single document into the specified collection.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database containing the collection.
  
- **`collectionName`**: `string`
  - The name of the collection where the document will be inserted.
  
- **`document`**: `map<anydata>`
  - The document to be inserted.

#### Returns

- **`boolean`**
  - Returns `true` if the document is inserted successfully; otherwise, returns `false`.

---

### `insertMany(string databaseName, string collectionName, map<anydata>[] documents) returns boolean`

Inserts multiple documents into the specified collection.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database containing the collection.
  
- **`collectionName`**: `string`
  - The name of the collection where the documents will be inserted.
  
- **`documents`**: `map<anydata>[]`
  - An array of documents to be inserted.

#### Returns

- **`boolean`**
  - Returns `true` if the documents are inserted successfully; otherwise, returns `false`.

---

### `findOne(string databaseName, string collectionName, json query) returns ()|Types:User?`

Retrieves a single document from the specified collection based on a query.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database containing the collection.
  
- **`collectionName`**: `string`
  - The name of the collection from which to retrieve the document.
  
- **`query`**: `json`
  - The query criteria to find the document.

#### Returns

- **`()|Types:User?`**
  - Returns the found document or `null` if no document is found or an error occurs.

---

### `findUsers(string databaseName, string collectionName, json query) returns ()|Types:User[]`

Retrieves multiple documents (users) from the specified collection based on a query.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database containing the collection.
  
- **`collectionName`**: `string`
  - The name of the collection from which to retrieve the documents.
  
- **`query`**: `json`
  - The query criteria to find the documents.

#### Returns

- **`()|Types:User[]`**
  - Returns an array of found documents or an empty array if no documents are found or an error occurs.

---

### `findMessages(string databaseName, string collectionName, json query) returns ()|Types:Message[]`

Retrieves multiple messages from the specified collection based on a query.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database containing the collection.
  
- **`collectionName`**: `string`
  - The name of the collection from which to retrieve the messages.
  
- **`query`**: `json`
  - The query criteria to find the messages.

#### Returns

- **`()|Types:Message[]`**
  - Returns an array of found messages or an empty array if no messages are found or an error occurs.

---

### `removeOne(string databaseName, string collectionName, json query) returns boolean`

Removes a single document from the specified collection based on a query.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database containing the collection.
  
- **`collectionName`**: `string`
  - The name of the collection from which to remove the document.
  
- **`query`**: `json`
  - The query criteria to identify the document to remove.

#### Returns

- **`boolean`**
  - Returns `true` if the document is removed successfully; otherwise, returns `false`.

---

### `updateOne(string databaseName, string collectionName, json query, json update) returns boolean`

Updates a single document in the specified collection based on a query.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database containing the collection.
  
- **`collectionName`**: `string`
  - The name of the collection where the document will be updated.
  
- **`query`**: `json`
  - The query criteria to identify the document to update.
  
- **`update`**: `json`
  - The new data to update the document with.

#### Returns

- **`boolean`**
  - Returns `true` if the document is updated successfully; otherwise, returns `false`.

---

### `count(string databaseName, string collectionName, json query) returns int`

Counts the number of documents in the specified collection that match the given query.

#### Parameters

- **`databaseName`**: `string`
  - The name of the database containing the collection.
  
- **`collectionName`**: `string`
  - The name of the collection to count documents in.
  
- **`query`**: `json`
  - The query criteria to count the documents.

#### Returns

- **`int`**
  - Returns the number of matching documents; returns `-1` if an error occurs.

---

## Overview

This module provides essential functionalities for interacting with MongoDB, such as creating collections, inserting documents, retrieving, updating, and deleting documents, along with error logging for better debugging and monitoring. It employs a connection management strategy to ensure reliable access to the MongoDB server.
