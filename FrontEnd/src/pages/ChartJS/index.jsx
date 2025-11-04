import './index.scss'

import {Chart as ChartJS} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';



export default function index() {
    
    return (
        <div className='Gráfico'>
            <Bar
            data={{
                labels: ["","b","c"],
                datasets: [
                    {
                        label: "Acessos diários",
                        data: [100,200,300]
                    },
                    {
                        label: "Acesso geral",
                        data: [100,200,500]
                    }
                ]
            }}
            
            />
        </div>
    )
}
