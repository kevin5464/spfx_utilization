import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from './UtilizationTool.module.scss';
import { IUtilizationToolProps } from './IUtilizationToolProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPClientContext } from '../utils/SPClientContext';
import { ISPListItemsResponse } from '../utils/ISPListItemsResponse';

export default class UtilizationTool extends React.Component<IUtilizationToolProps, any> {

    constructor(props: IUtilizationToolProps, state: any) {
        super();
        this.state = {
            chartData: {},
            chartOptions: {},
            spContext: new SPClientContext(props.context.spHttpClient, props.context.pageContext.web.absoluteUrl)
        };
    }

    stats: any = [];

    public render(): React.ReactElement<IUtilizationToolProps> {
        return (
            <div className={styles.util}>
                <h2>{this.props.description}</h2>
                <Doughnut data={this.state.chartData} options={this.state.chartOptions} />
            </div>
        );
    }

    public componentDidMount() {
        this.loadChart();
    }

    private loadChart(): void {
        var data: any = {};
        this.state.spContext.GetListItems("Utilization").then((response: ISPListItemsResponse) => {
            if (response.value) {
                data = this.parseData(response.value);
            } else {
                data = this.getTempChartData();
            }
            this.createChart(data);
        });
    }

    private parseData(spData): any {
        var data: any = {
            labels: [],
            datasets: [{
                backgroundColor: [],
                data: []
            }]
        };

        for (var i = 0; i < spData.length; i++) {
            var item = spData[i];
            data.labels.push(item.Title);
            data.datasets[0].backgroundColor.push(item.PieColor);
            data.datasets[0].data.push(item.PercentVal);
        }

        return data;
    }

    private getTempChartData(): any {
        return  {
            labels: ["Client Billable", "Client Non-Billable", "PTO", "Company Holiday"],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6"
                ],
                data: [67, 13, 8, 12]
            }]
        };
    }

    private createChart(data): void {
        this.setState({
            chartData: data,
            chartOptions: {
                legend: {
                    display: false
                },
                responsive: true
            }
        })
    }
}