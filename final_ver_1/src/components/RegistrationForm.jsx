// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Assuming you have a function to register the user
    const userData = {
      name,
      surname,
      email,
      age,
    };

    // Call a function to register the user, passing the user data
    registerUser(userData);

    // Optionally, you can clear the form fields after registration
    setName('');
    setSurname('');
    setEmail('');
    setAge('');
  };

  // A hypothetical function to register the user
  const registerUser = (userData) => {
    // Here, you can perform the registration logic, e.g., send a POST request to a server
    // Example using fetch:
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server as needed
        console.log('User registered successfully:', data);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(event) => setSurname(event.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;