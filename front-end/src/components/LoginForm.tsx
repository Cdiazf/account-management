import { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import axiosInstance from "../axios";
import { validatePassword, validateEmail } from "../utils/validation";

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include a number and a special character."
      );
      return;
    }

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      const { access_token, user, message } = response.data;
      sessionStorage.setItem("access_token", access_token);
      onLogin(user);
      alert(message);
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-center mb-4">Login</h2>
      <Form>
        <Form.Group controlId="loginUsername" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="loginPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" onClick={handleLogin} className="w-100">
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
