const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;

const pg =require('pg')
const { Client } = require('pg');

// Configure the PostgreSQL client
const client = new Client({
    host: POSTGRES_HOST, // PostgreSQL server address
    port: POSTGRES_PORT,        // Default PostgreSQL port
    user: POSTGRES_USER, // Replace with your PostgreSQL username
    password: POSTGRES_PASSWORD, // Replace with your PostgreSQL password
    database: POSTGRES_DB  // Replace with your database name
});

async function connect() {
    try {
        await client.connect();
        console.log('PostgreSQL Connected!');

    } catch (err) {
        console.error('PostgreSQL connection error:', err);
    } finally {
        await client.end();
    }
}

// Reusable query function
async function query(text, params) {
    return client.query(text, params);
}

module.exports = { connect, query };