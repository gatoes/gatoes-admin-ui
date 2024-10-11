
import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';

class OnboardingFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      startDate: moment().format("MM/DD/YYYY"),
      endDate: moment().format("MM/DD/YYYY"),
      dateRangeString: moment().format("MM/DD/YYYY") + ' - ' + moment().format("MM/DD/YYYY"),
    };
    this.onApply = this.onApply.bind(this);
  }

  // Handle input changes
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Handle date range changes
  onApply(e, picker) {
    this.setState({
      startDate: picker.startDate.format("MM/DD/YYYY"),
      endDate: picker.endDate.format("MM/DD/YYYY"),
      dateRangeString: picker.startDate.format("DD/MM/YYYY") + ' - ' + picker.endDate.format("DD/MM/YYYY"),
    });
  }

  // Apply filters
  applyFilters = (e) => {
    e.preventDefault();
    const { name, contact, startDate, endDate } = this.state;

    // Create the filter object
    const filters = {
      name,
      contact,
      startDate,
      endDate,
    };

    // Pass the filter data back to the parent component
    this.props.getFilterFields(filters);
  };

  render() {
    const { name, contact, dateRangeString } = this.state;

    return (
      <form onSubmit={this.applyFilters}>
        <div className="row filter-block" style={{ display: 'flex', alignItems: 'center' }}>
          {/* Status Filter */}
          <div className="col-sm-3 col-lg-3 col-xl-3">
          <div className="form-group">
	                    	<label>Restaurant Name</label>
	                    	<input type="text" name="name" className="form-control" value={name} placeholder="eg. Mahak" />
	                  	</div>
          </div>

          {/* Contact Filter */}
          <div className="col-sm-3 col-lg-3 col-xl-3">
            <div className="form-group">
              <label>Contact No.</label>
              <input
                type="text"
                name="contact"
                className="form-control"
                placeholder="e.g. 9876543210"
                value={contact}
                onChange={this.handleChange}
              />
            </div>
          </div>

          {/* Completion Date Range Filter */}
          <div className="col-sm-4 col-lg-4 col-xl-4">
            <div className="form-group">
              <label>Completion Date Range</label>
              <DateRangePicker
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onApply={this.onApply}
              >
                <input type="text" value={dateRangeString} className="form-control" />
              </DateRangePicker>
            </div>
          </div>

          {/* Apply Filter Button */}
          <div className="col-sm-2 col-lg-2 col-xl-2 align-self-center" >
          <div className="filter-result-block">
            <button type="submit" className="btn btn1" style={{ width: '100%' }}>Apply</button>
          </div>
          </div>
        </div>
      </form>
    );
  }
}

export default OnboardingFilter;
