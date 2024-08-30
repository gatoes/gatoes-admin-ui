import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { couponStatus, newPromoCouponStatus } from '../../constants';

class CouponFilter extends Component {
    constructor(props) {
        super(props);
        const filters = queryString.parse(props.location.search, { arrayFormat: 'bracket' });
        this.state = {
            status: '6', // Default status value
            ...filters
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.getFilterFields({ ...this.state });
    }

    submit(e) {
        e.preventDefault();
        const filters = { ...this.state };
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: "?" + new URLSearchParams(filters).toString()
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
        const { status, name, phone_number, startDate } = this.state;
        return (
            <form name="filter" onSubmit={this.submit} onChange={this.handleChange}>
                <div className="row filter-block">
                    <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
                        <div className="row">
                            <div className="col-sm-3 col-lg-4 col-xl-2">
                                <div className="form-group">
                                    <label>Status</label>
                                    <div className="select-ui">
                                        <select className="form-control selectbox-block" name="status" value={status} onChange={this.handleChange}>
                                            <option value="6">Choose status</option>
                                            {
                                                newPromoCouponStatus.map((obj, index) => (
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
                                <div className="filter-result-block">
                                    <button className="btn btn1">Apply</button>
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
