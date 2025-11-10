import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./DummyCharts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DummyCharts() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTheme(
            document.documentElement.getAttribute("data-theme") || "light"
          );
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark
    ? "rgba(148, 163, 184, 0.15)"
    : "rgba(148, 163, 184, 0.1)";
  const legendColor = isDark ? "#cbd5e1" : "#64748b";
  // Dummy data for flood trend over years
  const trendData = {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Flood Events",
        data: [12, 19, 15, 25, 22, 30, 28],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  // Dummy data for regions comparison
  const barData = {
    labels: ["Asia", "Europe", "Africa", "N. America", "S. America", "Oceania"],
    datasets: [
      {
        label: "High Risk Areas",
        data: [65, 45, 38, 28, 22, 15],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "#dc2626",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(239, 68, 68, 1)",
      },
      {
        label: "Medium Risk Areas",
        data: [45, 55, 42, 38, 28, 20],
        backgroundColor: "rgba(245, 158, 11, 0.8)",
        borderColor: "#f59e0b",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(245, 158, 11, 1)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: legendColor,
          font: {
            size: 12,
            weight: "600",
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: isDark
          ? "rgba(15, 23, 42, 0.98)"
          : "rgba(15, 23, 42, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#2563eb",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} events`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: legendColor,
          font: {
            size: 12,
            weight: "600",
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: isDark
          ? "rgba(15, 23, 42, 0.98)"
          : "rgba(15, 23, 42, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#2563eb",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} areas`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="dummy-charts-container">
      <div className="chart-wrapper">
        <div className="chart-header">
          <h3 className="chart-title">Flood Events Trend</h3>
          <p className="chart-subtitle">Annual flood occurrences (2018-2024)</p>
        </div>
        <div className="chart-canvas">
          <Line data={trendData} options={lineOptions} />
        </div>
      </div>

      <div className="chart-wrapper">
        <div className="chart-header">
          <h3 className="chart-title">Risk Distribution by Region</h3>
          <p className="chart-subtitle">High vs Medium risk areas</p>
        </div>
        <div className="chart-canvas">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default DummyCharts;
