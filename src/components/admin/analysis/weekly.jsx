'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesSummaryChart = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState({dailyRevenue: 0});

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/admin/retail/weekly', {
        params: { startDate, endDate },
      });
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching sales summary:', error);
    }
  };

  console.log("ddddddd", summary)
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Chart data configuration
  const chartData = {
    labels: summary?.dates || [], // Dates for x-axis
    datasets: [
      {
        label: 'Revenue',
        data: summary?.revenue || [], // Revenue data for y-axis
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Sales',
        data: summary?.orders || [], // Orders data for y-axis
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Summary',
      },
    },
  };

  return (
    <div>
      <h1>Sales Summary Chart</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit">Get Summary</button>
      </form>

      {summary && (
        <div>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default SalesSummaryChart;
