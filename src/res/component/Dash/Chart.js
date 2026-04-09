import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = ({dataRevenue}) => {
  const data = {
    labels: dataRevenue.dayRevenue,
    datasets: [
      {
        label: 'Doanh thu (Triệu VNĐ)',
        data: dataRevenue.revenueLast7Day,
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#eee',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <section className="details-grid" style={{ marginTop: '20px' }}>
      <div className="revenue-chart" style={{ height: '400px' }}> {/* Cần set chiều cao nếu maintainAspectRatio: false */}
        <h2>Phân tích doanh thu (7 ngày gần nhất)</h2>
        <Line data={data} options={options} />
      </div>
    </section>
  );
};

export default Chart