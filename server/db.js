import pkg from 'pg'; // Use the default import
const { Pool } = pkg; // Destructure to get Pool
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your PostgreSQL connection string
});

// Connect to the database
pool.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('Connection error', err.stack));

export default pool; // Export the pool instance for use in other modules
