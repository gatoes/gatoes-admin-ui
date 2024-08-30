import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import {getCurrencySymbol} from '../../utilities';

class BasicLocationAnalyticsGraph extends Component {
  	constructor(props){
    	super(props);
      this.state = {
        locationData: props.locationData
      }
  	}

  	render() {
      const {locationData} = this.props;
      //console.log('locationData', locationData);
      var locations = [];
      var revenue = [];
      var orders = [];
      let currecySymbol = getCurrencySymbol();
      locationData && locationData.length > 0 && locationData.map((obj, index) => (
        revenue.push(parseFloat(obj.revenue.toFixed(2))),   
        orders.push(obj.completedorder),
        locations.push(obj.name)
      ))

      //console.log(revenue, '==', orders, '==', locations);

      const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: locations
        },
        yAxis: [{
            min: 0,
            title: {
                text: 'Revenue'
            }
        }, {
            title: {
                text: 'Order'
            },
            opposite: true
        }],
        legend: {
            shadow: false
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Revenue',
            color: 'rgba(165,170,217,1)',
            data: revenue,
            tooltip: {
                valuePrefix: currecySymbol
            },
            pointPadding: 0.3,
            pointPlacement: -0.2
        },
        {
            name: 'Order',
            color: 'rgba(248,161,63,1)',
            data: orders,
            pointPadding: 0.3,
            pointPlacement: 0.2,
            yAxis: 1
        }]

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
export default BasicLocationAnalyticsGraph;