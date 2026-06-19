import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAssessments } from "../services/assessmentApi";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function Statistics() {
  const [stats, setStats] = useState({
    total: 0,
    low: 0,
    medium: 0,
    high: 0,
    averageProbability: 0,
    lastAssessment: null
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const assessments = await getAssessments();

      const total = assessments.length;

      const low = assessments.filter((a) => a.riskLevel === "Low").length;
      const medium = assessments.filter((a) => a.riskLevel === "Medium").length;
      const high = assessments.filter((a) => a.riskLevel === "High").length;

      const averageProbability =
        total === 0
          ? 0
          : assessments.reduce((sum, a) => sum + a.probability, 0) / total;

      const sortedAssessments = [...assessments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setStats({
        total,
        low,
        medium,
        high,
        averageProbability,
        lastAssessment: sortedAssessments[0] || null
      });
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = [
    { name: "Low", value: stats.low },
    { name: "Medium", value: stats.medium },
    { name: "High", value: stats.high }
  ];

  return (
    <div>
      <h1>Statistics</h1>
      <p className="subtitle">
        Pregled osnovne analitike na osnovu svih sačuvanih procena.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Assessments</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stat-card low-card">
          <h3>Low Risk</h3>
          <p>{stats.low}</p>
        </div>

        <div className="stat-card medium-card">
          <h3>Medium Risk</h3>
          <p>{stats.medium}</p>
        </div>

        <div className="stat-card high-card">
          <h3>High Risk</h3>
          <p>{stats.high}</p>
        </div>

        <div className="stat-card">
          <h3>Average Probability</h3>
          <p>{(stats.averageProbability * 100).toFixed(2)}%</p>
        </div>
      </div>

      <div className="statistics-content">
        <section className="chart-card">
          <h2>Risk Distribution</h2>

          {stats.total === 0 ? (
            <p>No data available for chart.</p>
          ) : (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        <section className="chart-card">
          <h2>Latest Assessment</h2>

          {stats.lastAssessment ? (
            <>
              <div className={`result-badge ${stats.lastAssessment.riskLevel?.toLowerCase()}`}>
                {stats.lastAssessment.riskLevel} risk
              </div>

              <p>
                <strong>Probability:</strong>{" "}
                {(stats.lastAssessment.probability * 100).toFixed(2)}%
              </p>

              <p>
                <strong>Age:</strong> {stats.lastAssessment.age}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(stats.lastAssessment.createdAt).toLocaleString()}
              </p>

              <p className="message">
                {stats.lastAssessment.message}
              </p>
            </>
          ) : (
            <p>No assessments available.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Statistics;