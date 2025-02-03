import BudgetChart from "../components/BudgetChart";
import BudgetDetails from "../components/BudgetDetails";
import IncomeChart from "../components/IncomeChart.tsx";
import IncomeDetails from "../components/IncomeDetails.tsx";

const Dashboard = () => {
  return (
    <div>
      <h1>Monthly Budget Dashboard</h1>
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
        <BudgetChart />
        <IncomeChart />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <BudgetDetails />
        <IncomeDetails />
      </div>
    </div>
  );
};

export default Dashboard;
