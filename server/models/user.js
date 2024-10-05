// Function to create a new user
export const createUser = async (pool, { username, email, password }) => {
    const res = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return res.rows[0];
  };
  
  // Function to find a user by email or username
  export const findUserByEmailOrUsername = async (pool, email, username) => {
    const res = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    return res.rows[0]; // Return the first user found or undefined
  };
  
  // Function to find a user by email
  export const findUserByEmail = async (pool, email) => {
    const res = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return res.rows[0]; // Return the first user found or undefined
  };
  
  // Function to get all users
  export const getAllUsers = async (pool) => {
    const res = await pool.query('SELECT * FROM users');
    return res.rows; // Return all users
  };
  