import React from 'react'
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2"

export default function Graph() {
    const labels = ['1', '2', '3', '4', '5', '6', '7' ] // x axis - should be datetime
    return (
        <div className="container">
            <Line 
                data = {{
                    labels: labels,
                    datasets: [{
                        label: 'My First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40], // y axis - should be 1rm
                        borderWidth: 1
                    }]
                }}
            />
        </div>
    )
}
