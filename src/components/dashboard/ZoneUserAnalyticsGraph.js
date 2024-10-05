import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ZoneUserAnalyticsGraph extends Component {
  	constructor(props){
    	super(props);
      this.state = {
        userData: props.userData
      }
  	}

  	render() {
      const {userData} = this.props;
      console.log('userData', userData);
      var location = [];
      var oldUser = [];
      var newUser = [];
      
      userData && userData.length > 0 && userData.map((obj, index) => (
        newUser.push(obj.newUser),   
        oldUser.push(obj.oldUser),
        location.push(obj.name)
      ))

      const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: location
        },
        yAxis: [{
            min: 0,
            title: {
                text: 'New User'
            }
        }, {
            title: {
                text: 'Old User'
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
            name: 'New User',
            color: 'rgba(165,170,217,1)',
            data: newUser,
            pointPadding: 0.3,
            pointPlacement: -0.2
        },
        {
            name: 'Old User',
            color: 'rgba(248,161,63,1)',
            data: oldUser,
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
export default ZoneUserAnalyticsGraph;