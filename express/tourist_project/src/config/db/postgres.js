const pg =require('pg')
const { Client } = require('pg');
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_DB = process.env.POSTGRES_DB;
// Configure the PostgreSQL client
const client = new Client({
    host: 'localhost', // PostgreSQL server address
    port: 5432,        // Default PostgreSQL port
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