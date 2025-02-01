import { useIncome } from "../hooks/useIncome";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const IncomeChart = () => {
  const { data, isLoading, error } = useIncome();

  if (isLoading) return <p>Loading income data...</p>;
  if (error) return <p>Error fetching income data: {error.message}</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const chartData = data?.details.map((item) => ({
    name: item.source,
    value: item.actual,
  }));

  return (
    <div>
      <h2>Income Distribution</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {chartData?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default IncomeChart;
