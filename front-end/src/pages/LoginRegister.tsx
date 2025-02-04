import { useState } from "react";
import { Container, Button } from "react-bootstrap";
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      {activeTab === "login" ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <RegisterForm onRegister={handleRegister} />
      )}
      <div className="text-center mt-3">
        {activeTab === "login" ? (
          <Button variant="link" onClick={() => setActiveTab("register")}>
            Create an account
          </Button>
        ) : (
          <Button variant="link" onClick={() => setActiveTab("login")}>
            Back to login
          </Button>
        )}
      </div>
    </Container>
  );
};

export default LoginRegister;
