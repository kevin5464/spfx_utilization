import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from './UtilizationTool.module.scss';
import { IUtilizationToolProps } from './IUtilizationToolProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class UtilizationTool extends React.Component<IUtilizationToolProps, any> {
    
    constructor() {
        super();
        this.state = {
            chartData: {

            },
            chartOptions: {
                legend: {
                    display: false
                }
            }
        };
    }

    public render(): React.ReactElement<IUtilizationToolProps> {
        return (
            <div className={styles.helloWorld}>
                <Doughnut data={this.state.chartData} options={this.state.chartOptions} />
            </div>
        );
    }

    public componentDidMount() {
        this.createChart();
    }

    private createChart(): void {
        this.setState({
            chartData: {
                labels: ["Client Billable", "Client Non-Billable", "PTO", "Company Holiday"],
                datasets: [{
                    backgroundColor: [
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e"
                    ],
                    data: [67, 13, 8, 12]
                }]
            }
        })
    }


}