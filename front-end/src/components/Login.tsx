import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tab,
  Tabs,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import axiosInstance from "../axios";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validation"; // ✅ Import validation functions

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!validateUsername(username)) {
      setError(
        "Username must be 4-15 characters long and contain only letters, numbers, or underscores."
      );
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include a number and a special character."
      );
      return;
    }

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });
      const { access_token } = response.data;
      sessionStorage.setItem("access_token", access_token);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  };

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
      await axiosInstance.post("/api/auth/register", registerData);
      alert("Registration successful! Please login.");
      setActiveTab("login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container fluid className="login-page">
      <Card className="card-container">
        <Row className="align-items-center vh-100">
          <Col md={6} className="login-image">
            <img
              src="./bank-account.jpg"
              alt="Login"
              className="img-fluid"
              style={{ height: "100vh", objectFit: "cover" }}
            />
          </Col>

          <Col md={6} className="login-form">
            <div className="form-container p-5">
              <h2 className="text-center mb-4">Welcome</h2>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || "login")}
                className="mb-3"
              >
                <Tab eventKey="login" title="Login">
                  <Form>
                    <Form.Group controlId="loginUsername" className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <Button
                      variant="primary"
                      onClick={handleLogin}
                      className="w-100"
                    >
                      Login
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="register" title="Register">
                  <Form>
                    <Form.Group controlId="registerUsername" className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={registerData.username}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            username: e.target.value,
                          })
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
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
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
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button
                      variant="success"
                      onClick={handleRegister}
                      className="w-100"
                    >
                      Register
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;
