const { Client } = require('pg');

// Configure the PostgreSQL client
const client = new Client({
    host: 'localhost', // PostgreSQL server address
    port: 5432,        // Default PostgreSQL port
    user: 'anphan', // Replace with your PostgreSQL username
    password: 'Khiemton1Dungcam10#', // Replace with your PostgreSQL password
    database: 'tourist'  // Replace with your database name
});

async function connect() {
    try {
        await client.connect();
        console.log('PostgreSQL Connected!');
    } catch (err) {
        console.error('PostgreSQL connection error:', err);
    }
}

// Reusable query function
async function query(text, params) {
    return client.query(text, params);
}

module.exports = { connect, query };