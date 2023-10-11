// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'; // Import useState from react
import RegistrationForm from './components/RegistrationForm';
import UserList from 'D:\\Programavimas\\gitHub\\Final_ver_1.1\\final_ver_1\\src\\components\\UserlList.jsx';

// App.js

// Import necessary modules and components

const App = () => {
  const [users, setUsers] = useState([]);

  const handleUserRegistration = (newUser) => {
    // Use functional update to ensure the most up-to-date state
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      <h1>User Registration App</h1>
      <RegistrationForm onUserRegistration={handleUserRegistration} />
      <UserList users={users} />
    </div>
  );
};

export default App;