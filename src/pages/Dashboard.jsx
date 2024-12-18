import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'
import { Doughnut, PolarArea, Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export function Dashboard() {
  // Mock data for labels and random values
  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
  const randomValues = () => labels.map(() => Math.floor(Math.random() * 100) + 10)

  // Updated blue-based color palette
  const bluePalette = [
    '#1E88E5', // Primary Blue
    '#42A5F5', // Light Blue
    '#90CAF9', // Pale Blue
    '#1565C0', // Dark Blue
    '#64B5F6', // Sky Blue
    '#1976D2', // Deep Blue
    '#82B1FF', // Bright Blue
    '#0D47A1', // Navy Blue
  ]

  // Doughnut Chart Data - Prices per label
  const priceData = {
    labels,
    datasets: [
      {
        label: 'Prices per Label',
        data: randomValues(),
        backgroundColor: bluePalette,
        borderColor: bluePalette.map((color) => darkenColor(color)),
        borderWidth: 1,
      },
    ],
  }

  // PolarArea Chart Data - Inventory percentage by label
  const inventoryData = {
    labels,
    datasets: [
      {
        label: 'Inventory Percentage',
        data: randomValues(),
        backgroundColor: bluePalette,
        borderWidth: 1,
      },
    ],
  }

  // Line Chart Data - Trends over time
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Trend',
        data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
        fill: false,
        backgroundColor: '#1E88E5', // Primary Blue
        borderColor: '#1E88E5', // Primary Blue
      },
    ],
  }

  // Helper function to darken a color slightly
  function darkenColor(color, amount = 20) {
    const col = parseInt(color.slice(1), 16)
    const r = Math.max(0, (col >> 16) - amount)
    const g = Math.max(0, ((col >> 8) & 0x00ff) - amount)
    const b = Math.max(0, (col & 0x0000ff) - amount)
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="chart-container">
        <div className="chart">
          <h2>Prices per Label</h2>
          <Doughnut data={priceData} />
        </div>
        <div className="chart">
          <h2>Inventory by Label</h2>
          <PolarArea data={inventoryData} />
        </div>
        <div className="chart">
          <h2>Trends Over Time</h2>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  )
}
