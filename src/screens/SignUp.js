import { auth } from '../api/Firebase';
import { Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSuccessMessage('Sign up successful');
        navigate('/Home');
      } else {
        setError('');
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Sign up successful');
      navigate('/Home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccessMessage('Sign in with Google successful');
      navigate('/Home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>WELCOME BACK</h1>
      <p>Enter your credentials to sign up</p>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      <Button variant="outline-dark" size="lg" onClick={handleGoogleSignIn}>
        Continue with Google
      </Button>
      <hr />

      <Form onSubmit={handleSignUp} className="signup-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
