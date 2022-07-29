import dotenv from 'dotenv'

export default {
    mongodb: {
        connectionString: process.env.MongoDB_connectionString
    },
    firebase: {
        "type": process.env.FIREBASEDB_type,
        "project_id": process.env.FIREBASEDB_project_id,
        "private_key_id": process.env.FIREBASEDB_private_key_id,
        "private_key": process.env.FIREBASEDB_private_key,
        "client_email": process.env.FIREBASEDB_client_email,
        "client_id": process.env.FIREBASEDB_client_id,
        "auth_uri": process.env.FIREBASEDB_auth_uri,
        "token_uri": process.env.FIREBASEDB_token_uri,
        "auth_provider_x509_cert_url": process.env.FIREBASEDB_auth_provider_x509_cert_url,
        "client_x509_cert_url": process.env.FIREBASEDB_client_x509_cert_url
    }
}