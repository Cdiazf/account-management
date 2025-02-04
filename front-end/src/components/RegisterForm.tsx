import { useState } from "react";
import { Card, Alert, Button, Form } from "react-bootstrap";
import axiosInstance from "../axios";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../utils/validation";

interface RegisterFormProps {
  onRegister: () => void;
}

const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!validateEmail(registerData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validateUsername(registerData.username)) {
      setError(
        "Username must be 4-15 characters long and contain only letters, numbers, or underscores."
      );
      return;
    }

    if (!validatePassword(registerData.password)) {
      setError(
        "Password must be at least 8 characters long, include a number and a special character."
      );
      return;
    }

    try {
      const response = await axiosInstance.post("/register", registerData);
      alert(response.data.message);
      onRegister();
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-center mb-4">Register</h2>
      <Form>
        <Form.Group controlId="registerUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={registerData.username}
            onChange={(e) =>
              setRegisterData({ ...registerData, username: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="registerEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="registerPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="success" onClick={handleRegister} className="w-100">
          Register
        </Button>
      </Form>
    </Card>
  );
};

export default RegisterForm;
