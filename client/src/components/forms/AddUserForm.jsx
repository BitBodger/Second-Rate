import React, { useState } from 'react';

const AddUserForm = ({ users, setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email already exists
    if (users.some(user => user.email === email)) {
      setError('This email is already registered.');
      return;
    } else {
      setError('');
    }

    const newUser = { name, email, password };

    // Send POST request to add a new user
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.json();
      })
      .then(addedUser => {
        setUsers([...users, addedUser]);
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error('Error adding user:', error);
        setError('Error adding user: ' + error.message);
      });
  };

  return (
    <div>
      <h2>Add a New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddUserForm;
