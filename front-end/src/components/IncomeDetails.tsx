import { useIncome } from "../hooks/useIncome";

const IncomeDetails = () => {
  const { data, isLoading, error } = useIncome();

  if (isLoading) return <p>Loading income data...</p>;
  if (error) return <p>Error fetching income: {error.message}</p>;

  return (
    <div>
      <h2>Income Details</h2>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Planned</th>
            <th>Actual</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {data?.details.map((item) => {
            const difference = item.actual - item.planned;
            return (
              <tr key={item.source}>
                <td>{item.source}</td>
                <td>${item.planned}</td>
                <td>${item.actual}</td>
                <td
                  style={{
                    color: difference >= 0 ? "green" : "red",
                  }}
                >
                  ${difference}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeDetails;
