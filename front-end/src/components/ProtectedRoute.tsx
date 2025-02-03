import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

    // Token is valid, allow access
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    sessionStorage.removeItem("access_token");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
