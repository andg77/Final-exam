// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

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
    <Table striped bordered hover>
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
              <button type="button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
