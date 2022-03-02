import { Component } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export default class Charts extends Component {
    render() {

        const options = {
            responsive: true,
            interaction: {
                mode: 'index' as const,
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: true,
                    text: '',
                },
            },
            scales: {
                y: {
                    type: 'linear' as const,
                    display: true,
                    position: 'left' as const,
                },
                y1: {
                    type: 'linear' as const,
                    display: true,
                    position: 'right' as const,
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
        };

        const data = {
            labels: [
                "Server 1",
                "Server 2",
                "Server 3"
            ],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [60, 70, 35],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'Dataset 2',
                    data: [30, 50, 98],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y1',
                }
            ],
        };

        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );

        return (
            <div className="card">
                <Line
                    {...{
                        data,
                        options,
                    }}
                />
            </div>
        );
    }
}