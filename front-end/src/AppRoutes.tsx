import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BudgetDetails from "./components/BudgetDetails";
import IncomeDetails from "./components/IncomeDetails";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/budget" element={<BudgetDetails />} />
        <Route path="/income" element={<IncomeDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
