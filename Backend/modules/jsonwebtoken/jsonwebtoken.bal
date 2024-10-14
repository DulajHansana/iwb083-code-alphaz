import ballerina/jwt;

# Description.
#
# + authHeader - parameter description  
# + jwtSecret - parameter description
# + return - return value description
public isolated function verifyToken(string authHeader, string jwtSecret) returns jwt:Error|jwt:Payload {
    string jwtToken = authHeader.substring(7);
    jwt:ValidatorSignatureConfig signatureConfig = {
                secret: jwtSecret
            };

    jwt:ValidatorConfig validator = {
                signatureConfig: signatureConfig
            };

    return jwt:validate(jwtToken, validator);
}
