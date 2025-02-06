import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axios";

interface JwtPayload {
  exp?: number;
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token to extract the payload
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);

    // Check if the token has expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      sessionStorage.removeItem("access_token");
      return <Navigate to="/login" />;
    }

    // Check with the backend if the token is blacklisted
    const verifyToken = async () => {
      try {
        await axiosInstance.get("/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Token is blacklisted:", error);
        sessionStorage.removeItem("access_token");
        return <Navigate to="/login" />;
      }
    };

    verifyToken();

    // Token is valid, allow access
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    sessionStorage.removeItem("access_token");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
