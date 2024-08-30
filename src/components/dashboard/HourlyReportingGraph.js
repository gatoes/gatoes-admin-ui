import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//import moment from 'moment';
//import {getCurrencySymbol} from '../../utilities';

class HourlyReportingGraph extends Component {
  	constructor(props){
    	super(props);
      this.state = {
        reporting: props.reporting
      }
  	}

  	render() {
      const {reporting} = this.props;

      var received = [];
      var accepted = [];
      var cancelled = [];
      var delivered = [];
      var promo = [];
      var timing = [];
      
      reporting && reporting.length > 0 && reporting.map((obj, index) => (
        timing.push(obj.timing),   
        received.push(obj.totalOrders),
        accepted.push(obj.orderAccepted),
        delivered.push(obj.orderCompleted),
        promo.push(obj.promo),
        cancelled.push(obj.orderCancelled)
      ))
      
      const options = {
        chart: {
            type: 'column'
        },
        title: {
          text: undefined
        },
        xAxis: {
          categories: timing
        },
        yAxis: {
          min: 0,
          title: {
              text: 'Orders'
          }
        },
        legend: {
            shadow: false
        },
        credits: {
            enabled: false
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Received',
            data: received
        }, {
            name: 'Accepted',
            data: accepted
        }, {
            name: 'Delivered',
            data: delivered
        }, {
            name: 'Cancelled',
            data: cancelled
        },  {
            name: 'Promo',
            data: promo
        }],

      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }

      };
    	return (
    		<div className="inner-content-ui order-analyitcs">
            <div className="analyitcs-title">
                
            </div>
            <div className="order-chart-block">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>

   		);
  	}
}
export default HourlyReportingGraph;