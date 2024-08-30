import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { couponStatus } from '../../constants';
import { deliveryRegionListing, regionListing } from '../../actions/regions';

class CouponFilter extends Component {
    constructor(props) {
        super(props);
        const filters = queryString.parse(props.location.search, { arrayFormat: 'bracket' });
        this.state = {
            regionListing : [],
            status: '6', // Default status value
            restaurantName:'',
            zone: 0,
            ...filters
        };
        this.handleChange = this.handleChange.bind(this);
        // this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);

    }
    componentDidMount(){
	    regionListing().then((response) => {
	      	this.setState({
	        	regionListing: response.data.data.region
	      	});
	    })
	}

    componentWillMount() {
        this.props.getFilterFields({ ...this.state });
    }

    reset(e) {
        e.preventDefault();
        this.setState({
            status: '6',
            restaurantName: '',
            zone: 0,
        }, () => {
            this.props.history.push({
                pathname: this.props.location.pathname,
                search: ""
            });
            let filter = {
                status: '6',
                restaurantName: '',
                zone: 0,
            }
            this.props.getFilterFields(filter);
        });
        if(this.props.updatePromoFullScreen){
            this.props.updatePromoFullScreen()
        }
    }

    submit(e) {
        e.preventDefault();
        const filters = { ...this.state };
        delete filters.regionListing;

        this.props.history.push({
            pathname: this.props.location.pathname,
            search: "?" + window.$$.param(filters)
        });
        this.props.getFilterFields(filters);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
       
    }

  

	

    render() {
        const { status, name,zone, phone_number, startDate,restaurantName } = this.state;
        return (
            <form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)}>
                <div className="row filter-block">
                    <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
                        <div className="row">
                        <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Restaurant Name</label>
	                    	<input type="text" name="restaurantName" className="form-control" value={restaurantName} placeholder="eg. Mahak" />
	                  	</div>
	                </div>
                    <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Zone</label>
	                    	<div className="select-ui">
		                    <select className="form-control selectbox-block" name="zone"  value={zone}>
		                      <option value="0">Choose zone</option>
		                      {
		                        this.state.regionListing.length > 0
		                        &&
		                        this.state.regionListing.map((obj, index) => (
		                          <option value={obj.id}>{obj.name}</option>
		                        ))
		                      }
		                    </select>
		                    </div>
	                  	</div>
	                </div>
                            <div className="col-sm-3 col-lg-4 col-xl-2">
                                <div className="form-group">
                                    <label>Status</label>
                                    <div className="select-ui">
                                        <select className="form-control selectbox-block" name="status" value={status} onChange={this.handleChange}>
                                            <option value="6">Choose status</option>
                                            {
                                                couponStatus.map((obj, index) => (
                                                    <option value={obj.value} key={index}>{obj.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* Uncomment and use as needed */}
                            {/* 
                            <div className="col-sm-3 col-lg-4 col-xl-3">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type="text" name="name" className="form-control" placeholder="eg. Alpha" value={name} />
                                </div>
                            </div>
                            <div className="col-sm-3 col-lg-4 col-xl-3">
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input type="text" name="phone_number" className="form-control" placeholder="eg. 987678987" value={phone_number} />
                                </div>
                            </div>
                            */}
                            {/* 
                            <div className="col-sm-3 col-lg-4 col-xl-3">
                                <div className="form-group calender-block">
                                    <label>Choose Date</label>
                                    <DatePicker
                                        name="startDate"
                                        selected={startDate}
                                        onChange={date => this.setState({ startDate: date })}
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                            </div> 
                            */}
                            <div className="col-sm-3 col-lg-4 col-xl-2 align-self-center">
                                <div className="filterAction">
                                <div className="filter-result-block">
                                    <button className="btn btn1">Apply</button>
                                </div>
                                <div className="filter-result-block">
                                    <button className="btn btn1" onClick={this.reset}>Reset</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(CouponFilter);
