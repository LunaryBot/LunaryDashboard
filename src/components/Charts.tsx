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
            },
        };

        const data = {
            labels: Last7Days(),
            datasets: [
                {
                    label: 'Bans',
                    data: Array(7).fill(0),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'Kicks',
                    data: Array(7).fill(1),
                    borderColor: 'rgb(234, 137, 53)',
                    backgroundColor: 'rgba(234, 137, 53, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'Mutes',
                    data: Array(7).fill(2),
                    borderColor: 'rgb(75, 140, 210)',
                    backgroundColor: 'rgba(75, 140, 210, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'Advs',
                    data: Array(7).fill(3),
                    borderColor: 'rgb(234, 172, 53)',
                    backgroundColor: 'rgba(234, 172, 53, 0.5)',
                    yAxisID: 'y',
                },
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

function Last7Days() {
    const currentDate = new Date('03/02/2022 00:00');
    const now = Date.now()

    const dates = [currentDate, ...Array(6).fill(0).map((_, i) => new Date(now - ((i + 1) * 1000 * 60 * 60 * 24)))]

    return dates.map(formatDate)
}

function formatDate(date){
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if(dd < 10) { dd = '0' + dd }
    if(mm < 10) { mm = '0' + mm }
    date = dd + '/' + mm  + '/' + yyyy;
    return date
}