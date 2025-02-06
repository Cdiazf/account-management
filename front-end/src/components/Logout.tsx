import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axiosInstance.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      sessionStorage.removeItem("access_token");
      window.location.href = "/login"; // Force redirect
    }
  };

  return (
    <button onClick={handleLogout} style={logoutButtonStyle}>
      Logout Back End
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
