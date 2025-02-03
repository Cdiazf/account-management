import { useBudget } from "../hooks/useBudget";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const BudgetChart = () => {
  const { data, isLoading, error } = useBudget();

  if (isLoading) return <p>Loading budget data...</p>;
  if (error) return <p>Error fetching budget data: {error.message}</p>;

  const chartData = data?.details.map((item) => ({
    name: item.category,
    Planned: item.planned,
    Actual: item.actual,
  }));

  return (
    <div>
      <h2>Budget Overview</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Planned" fill="#8884d8" />
        <Bar dataKey="Actual" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BudgetChart;
