import React from 'react'
import {
    Chart,
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from "react-chartjs-2"
import 'chartjs-adapter-date-fns';

Chart.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)
export default function Graph() {
    const labels = ['2022-11-01', '2022-11-02', '2022-11-04']
    const data = {
        labels: labels,
        datasets: [{
            label: 'label',
            data: [1, 2, 3],
            tension: 0.4
        }]

    }
    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    }
    return (
        <div className="container">
            <Line 
                data={data}
                options={options}
            />
        </div>
    )
}
