'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js/auto'
import { PostsItem } from '@/app/api/analytics/posts-crud/route'

const UsersChart: React.FC<{
  Items: PostsItem[]
}> = ({ Items }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const [chartInstance, setChartInstance] = useState<Chart | null>(null)

  useEffect(() => {
    const getLast30DaysLabels = () => {
      const labels = []
      for (let i = 0; i < 30; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        labels.unshift(
          date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        )
      }
      return labels
    }

    const eventCountByDay = Items.reduce((acc, event) => {
      const eventDate = new Date(event.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
      acc[eventDate] = (acc[eventDate] || 0) + 1
      return acc
    }, {})

    if (!chartRef.current) return

    const chartLabels = getLast30DaysLabels()
    const chartData = chartLabels.map(label => eventCountByDay[label] || 0);

    const newChartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: '# Post create events in last 30 days',
            data: chartData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })

    setChartInstance(newChartInstance)

    return () => {
      newChartInstance.destroy()
    }
  }, [])

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  )
}

export default UsersChart
