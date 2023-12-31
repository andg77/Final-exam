// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './user-list.css'; // Import the CSS file

async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:3000/users');

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null; // Return null or handle the error as needed
  }
}

const UserList = () => {
  const [users, setUsers] = useState([]);

  const handleDeleteUser = (userId) => {
    // Send a DELETE request to your server to delete the user
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If the deletion is successful, remove the user from the state
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers()
      .then((data) => {
        if (data) {
          setUsers(data);
          console.log('Fetched users:', data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <Table className="user-list" striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Age</th>
          <th>Administration buttons</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>
              <button type="button">Edit</button>
              <button type="button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;

