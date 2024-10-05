import React, { useEffect, useState } from 'react';
import UserList from '../components/users/UserList';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the Express backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Assuming your API endpoint is /api/users
        const data = await response.json();
        setUsers(data); // Set the fetched users to state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users Page</h1>
      <UserList users={users} /> {/* Pass the users to UserList */}
    </div>
  );
};

export default UsersPage;
