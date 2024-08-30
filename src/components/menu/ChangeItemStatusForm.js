import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Error from '../common/Error';
import moment from 'moment';
//import { connect } from 'react-redux';
import {statusItemAvailability} from '../../actions/menus';

class ChangeItemStatusForm extends Component {
  constructor(props){
    super(props);
    this.state= {
      itemId: props.itemId,
      itemIndex: props.itemIndex,
      menuIndex: props.menuIndex,
      isVeg: props.isVeg,
      itemAvailabilityStatus: null,
      startDate: new Date(),
      minTime: null,
      shopId: props.shopId,
      errors: {},
    }
    this.chkItemStatus = this.chkItemStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  chkItemStatus(e){
    this.setState({
        itemAvailabilityStatus: e.target.value
    }); 
  }

  handleChange(date) {
    this.setState({
      startDate: date,
      minTime : this.calculateMinTime(date)
    }); 
  }

  componentDidMount(){
    this.setState({
      minTime : this.calculateMinTime(new Date())
    })
  }

  calculateMinTime = date => {
    let isToday = moment(date).isSame(moment(), 'day');
    if (isToday) {
        let nowAddOneHour = moment(new Date()).add({hours: 1}).toDate();
        return nowAddOneHour;
    }
    return moment().startOf('day').toDate(); // set to 12:00 am today
  }

  submit(e){
    e.preventDefault();
    let data = {};
    const {itemAvailabilityStatus, itemIndex, itemId, menuIndex, isVeg, shopId} = this.state;
    const formData = window.$$(e.target).serializeArray();
    formData.map(item => {
      data = {...data, [item.name]: item.value}
    });
    if(this.state.startDate){
      data.available_date = this.state.startDate;
    }
    console.log('data', data);
    if(itemAvailabilityStatus == null){
      this.setState({
        errors: {status_validate: 'Please choose atleast one option!'}
      });
    } else {
      this.setState({
        errors: {}
      });
      
      statusItemAvailability({available_date: data.available_date, itemId: data.itemId, stock: data.stock, availability: false, shopId: shopId}).then((response) => {
        console.log('resp', response);
        this.props.updateMenuData(itemId, itemIndex, menuIndex, isVeg, response.data.data.nextAvailableOn);
      });

    }
  }

	render() {
    const { itemAvailabilityStatus, errors } = this.state;
    console.log('errors', itemAvailabilityStatus);
    return ( 
       <form className="travelot-popup-panel" onSubmit={this.submit.bind(this)}>
        <div className="modal-body">
          <div className="popup-content-block">
            <ul className="radio-block">
              <li>
                <input type="radio" id="stock2" name="stock" defaultValue="1" className="datepicker" onClick={this.chkItemStatus} />
                <label htmlFor="stock2">
                  <span>For a specific day</span>
                  <p>select a date from when the item will be available</p>
                </label>
                {
                  itemAvailabilityStatus == '1'
                  ?
                  <div className="set-datepicker">
                    <span>Set date</span>
                    <DatePicker
                      name="available_date"
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChange}
                      minDate={new Date()}
                      minTime={this.state.minTime}
                      maxTime={moment().endOf('day').toDate()}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={60}
                      dateFormat="yyyy-MM-dd h:mm aa"
                      timeCaption="time"
                      placeholderText="Choose scheduled time"
                    />
                    {/*
                    <DatePicker
                      name="available_date"
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      minDate={new Date()}
                      dateFormat= "yyyy-MM-dd"
                    />
                    */}
                  </div>
                  :
                  <input type="hidden" value={moment(new Date()).add(1,'days').format('YYYY-MM-DD')} name="available_date" />
                }
                
              </li>
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <input type="hidden" name="itemId" value={this.state.itemId} />
          { typeof errors.status_validate !== 'undefined' && <Error text={errors.status_validate} />}
          <button type="button" className="btn btn1" data-dismiss="modal">CANCEL</button>
          <button type="submit" className="btn btn2"><i className="material-icons">
          check_circle</i>SAVE</button>
        </div>
      </form>
  	);
  }
}

export default ChangeItemStatusForm;