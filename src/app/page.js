'use client'
import { useState } from 'react';
import { redirect } from 'next/navigation';

async function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation on the server-side
    if (!username || !password) {
      setErrorMessage('Please enter username and password');
      return;
    }

    // Implement login logic here (e.g., fetch API to validate credentials)
    // For this example, we'll simulate a successful login after a delay
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

    setUsername('');
    setPassword('');
    setErrorMessage(null);

    // Redirect to the desired page after successful login
    return redirect('/dashboard'); // Replace with your target route
  };

  return (
    <form onSubmit={handleSubmit} className='bg-gray-800'>
      {/* Login form fields and error message (see below for CSS) */}
      <div className="username-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="password-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
