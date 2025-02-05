import { useState } from "react";
import { Tabs, Row, Col, Container, Card, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = (user: unknown) => {
    console.log("User logged in:", user);
    navigate("/");
  };

  const handleRegister = () => {
    setActiveTab("login");
    navigate("/");
  };

  return (
    <Container className="login-page">
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
                  <LoginForm onLogin={handleLogin} />
                </Tab>
                <Tab eventKey="register" title="Register">
                  <RegisterForm onRegister={handleRegister} />
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default LoginRegister;
