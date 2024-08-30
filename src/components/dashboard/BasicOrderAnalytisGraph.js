import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class BasicRevenueAnalytics extends Component {
  	constructor(props){
    	super(props);
      this.state = {
        orderData: props.orderData
      }
  	}

  	render() {
      const {orderData} = this.props;
      //console.log('orderData', this.props.orderData);
      const options = {
        title: {
          text: undefined,
          align: 'center',
          enabled: false,
          verticalAlign: 'middle',
          y: 0
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: true,
          align: 'center',
          verticalAlign: 'bottom',
          y: 0,
          padding: 0,
          itemMarginTop: 0,
          itemMarginBottom: 100,
          itemStyle:{
            fontSize: '10px'
          }
        },
        plotOptions: {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          pie: {
            showInLegend: true,
            dataLabels: {
              enabled: true,
              distance: 5,
              format: '{point.percentage:.1f}%',
              style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            },
            startAngle: -180,
            endAngle: 180,
            center: ['50%', '50%'],
            size: '80%',
            allowPointSelect: true,
            cursor: 'pointer',
          }
        },
        series: [{
          type: 'pie',
          name: 'Orders',
          colorByPoint: true,
          innerSize: '50%',
          data: orderData
        }]

      };
    	return (
    		<div className="inner-content-ui order-analyitcs">
            <div className="analyitcs-title">
                <p>Analytics</p>
                <span>Based on today’s order status</span>
            </div>
            <div className="order-chart-block">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>

   		);
  	}
}
export default BasicRevenueAnalytics;