import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.removeItem("access_token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={logoutButtonStyle}>
      Logout
    </button>
  );
};

export default Logout;

const logoutButtonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  color: "#fff",
  backgroundColor: "#ff4d4f",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
