import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

class BasicRevenueAnalytics extends Component {
  	constructor(props){
    	super(props);
      this.state = {
        revenueData: props.revenueData,
        currecySymbol: props.currecySymbol,
        resultData: []
      }
  	}

  	render() {
      const {revenueData, currecySymbol} = this.props;
      
      let sortedData = null;

    if(revenueData && revenueData.length > 0){
        let sortedData = [...revenueData].sort((a, b) => {
            if (parseInt(a['_id']) < parseInt(b['_id'])) {
                return -1;
              }
              if (parseInt(a['_id']) > parseInt(b['_id'])) {
                return 1;
              }
              return 0;
        });
        console.log('wewewewe', sortedData)

        var dayz = [];
      var revenue = [];
      var completedorder = [];
      
      sortedData && sortedData.length > 0 && sortedData.map((obj, index) => (
        revenue.push(parseFloat(obj.revenue.toFixed(2))),   
        completedorder.push(obj.completedorder),   
        dayz.push(obj._id)
      ))
    }

      

      const options = {
        chart: {
          type: 'areaspline'
        },
        title: {
            text: undefined
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
          categories: dayz
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

        // yAxis: {
        //     title: {
        //         text: 'Revenue'
        //     }
        // },
        tooltip: {
            shared: true
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'Revenue',
            color: 'rgba(165,170,217,1)',
            data: revenue,
            tooltip: {
                valuePrefix: currecySymbol
            }
        },
        {
            name: 'Order',
            color: 'rgba(248,161,63,1)',
            data: completedorder,
            yAxis: 1
        }]
        // series: [{
        //     name: 'Revenue',
        //     data: revenue
        //   },
        //   {
        //       name: 'Orders',
        //       data: completedorder
        //   }
        // ]

      };
    	return (
    		<div className="inner-content-ui order-analyitcs">
            <div className="analyitcs-title">
                <p>Analytics</p>
                <span>Based on records</span>
            </div>
            <div className="order-chart-block">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>

   		);
  	}
}
export default BasicRevenueAnalytics;