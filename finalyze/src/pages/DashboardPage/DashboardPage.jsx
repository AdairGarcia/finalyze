import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export const DashboardPage = () => {
  const { user, token } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/dashboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              xtoken: token.accessToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(JSON.parse(data.body));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (loading) {
    return <div className="text-center mt-5">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Dashboard</h1>
      <div className="card shadow p-4">
        <h3>Transactions</h3>
        <ul>
          {dashboardData.transactions.map((txn, index) => (
            <li key={index}>{JSON.stringify(txn)}</li>
          ))}
        </ul>
      </div>
      <div className="card shadow p-4 mt-4">
        <h3>Percentiles</h3>
        <ul>
          {dashboardData.percentiles.map((percentile, index) => (
            <li key={index}>{JSON.stringify(percentile)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
