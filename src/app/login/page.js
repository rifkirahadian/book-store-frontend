'use client'

import { setUser } from '@/services/localstorage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser({
      point: 100,
      email,
    });
    router.push('/')
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='mb-3 mt-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form> 
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
