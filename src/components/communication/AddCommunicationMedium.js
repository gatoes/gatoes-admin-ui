import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import validate from './ValidateForm';
import { addCommunicationType } from '../../actions/communication';
import {NOTIFICATION_TYPE, NOTIFICATION_USER, API_ROOT} from '../../constants';
import RenderZoneOptoin from './RenderZoneOptoin';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CSVReader from 'react-csv-reader';
//import ShopCategoryImage from '../shops/ShopCategoryImage';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';
import ShopImage from '../shops/ShopImage';

class AddCommunicationMedium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType : 0,
      isSchedule: false,
      isCsv: false,
      csv_records:[],
      inbox: 0,
      minTime: null
    }
    this.handleUserType = this.handleUserType.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleForce = this.handleForce.bind(this);
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
    //this.getImage = this.getImage.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleNotificationType = this.handleNotificationType.bind(this);
    this.getShopImage = this.getShopImage.bind(this);
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

  handleEditorChange(e){
    //console.log('aaaaaa', e.target.getContent());
    this.props.change('message', e.target.getContent());
  }

  // getImage(imageId){
  //   this.props.change('image', imageId);
  // }

  handleUserType(e){
    if(e.value == 1 || e.value == 2){
      this.setState({
        userType : 1
      })
    } else {
      this.setState({
        userType : 0
      })
    }
  }

  handleNotificationType(e){
    if(e.value == 1){
      this.setState({
        inbox : 1
      })
    } else {
      this.setState({
        inbox : 0
      })
    }
  }

  handleSchedule(e){
    this.setState({
      isSchedule: !this.state.isSchedule
    });
  }

  handleCsvUpload(e){
    this.setState({
      isCsv: !this.state.isCsv
    });
  }

  handleForce(data){
    this.setState({
      csv_records: data.flat()
    });
    this.props.change('csv_records', this.state.csv_records);
  }
  
  handleChangeStart(sdate){
    console.log('8888888', sdate);
    let isToday = moment(sdate).isSame(moment(), 'day');
    this.setState({
      startDate: sdate,
      minTime: isToday ? this.calculateMinTime(new Date()) : moment().startOf('day').toDate()
    });
    this.props.change('scheduled_time', sdate); 
  }

  getShopImage(imageId){
    this.props.change('image', imageId);
  }

  submitMessageForm(values){
    //console.log('values', values);
    return addCommunicationType(values)
    .then((result) => {
      toast.success('Message setup added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/managecommunicationmedium');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    //console.log('isSchedule', this.state.isSchedule);
    const {userType, inbox} = this.state;
    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add Communication Type</h4>
          </div>

          <form onSubmit={handleSubmit(this.submitMessageForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Details</h4>
                      </div>
                      <div className="form-block promocode-ui">
                        <div className="row">
                          <div className="col-lg-12">
                            <Field
                              name="subject"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Subject"
                              placeholder="Eg. welcome"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label>Message</label>
                              <div className="textfield-block">
                                <Editor
                                  apiKey='m666sztktbfrt2vwon7h8ndd9zejiwd1ihgr96z56pblsvv8'
                                  initialValue=""
                                  init={{
                                    plugins: 'link image code',
                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                                    images_upload_url: API_ROOT + '/common/editorimage'
                                  }}
                                  onChange={this.handleEditorChange}
                                />
                                <Field
                                  name="message"
                                  component={renderField}
                                  type="hidden"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Notification User"
                              name='notificationUser'
                              options={NOTIFICATION_USER}
                              component={renderReactSelect}
                              placeholder="Select Type"
                              multi={false}
                              parentCallback={ this.handleUserType }
                              parentDivClass="form-group w-100"
                            />
                          </div>
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Notification Type"
                              name='notificationType'
                              options={NOTIFICATION_TYPE}
                              component={renderReactSelect}
                              placeholder="Select Type"
                              multi={false}
                              parentDivClass="form-group w-100"
                              parentCallback={ this.handleNotificationType }
                            />
                          </div>
                        </div>

                        <FieldArray name="zone" userType={userType} component={RenderZoneOptoin} formProps = {this.props.formProps} />
                        <div className="row">
                          {
                            inbox
                            ?
                            <div className="form-group ri-block col-lg-6">
                              <ul className="cs-check-box">
                                <li>
                                  <div className="os-check-box">
                                    <Field
                                      name="send_inbox"
                                      id="send_inbox"
                                      component="input"
                                      type="checkbox"
                                    />
                                    <label for="send_inbox">Send to Inbox?</label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            :
                            null
                          }
                          <div className="form-group ri-block col-lg-6">
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="is_scheduled"
                                    id="promocode_other"
                                    component="input"
                                    type="checkbox"
                                    onClick={ this.handleSchedule }
                                  />
                                  <label for="promocode_other">Scheduled ?</label>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {
                            this.state.isSchedule === true
                            ?
                            <div className="col-lg-12">
                              <div className="form-group">
                                <DatePicker
                                  name="start_date"
                                  selected={this.state.startDate}
                                  selectsStart
                                  startDate={this.state.startDate}
                                  endDate={this.state.endDate}
                                  onChange={this.handleChangeStart}
                                  minDate={new Date()}
                                  minTime={this.state.minTime}
                                  maxTime={moment().endOf('day').toDate()}
                                  showTimeSelect
                                  timeFormat="HH:mm"
                                  timeIntervals={15}
                                  dateFormat="yyyy-MM-dd h:mm aa"
                                  timeCaption="time"
                                  placeholderText="Choose scheduled time"
                                />
                                </div>
                            </div>
                            :
                            null
                          }
                        </div>


                        <div className="row">
                          
                          <div className="form-group ri-block col-lg-6">
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="upload_csv"
                                    id="upload_csv"
                                    component="input"
                                    type="checkbox"
                                    onClick={ this.handleCsvUpload }
                                  />
                                  <label for="upload_csv">Upload user type CSV?</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {
                          this.state.isCsv === true
                          ?
                          <div className="row">
                            <CSVReader
                              cssClass="react-csv-input"
                              label="Upload CSV"
                              onFileLoaded={this.handleForce}
                            />
                            <Field
                              name="csv"
                              component={renderField}
                              type="hidden"
                            />
                          </div>
                          :
                          null
                        }

                        <div className="col-lg-12 col-md-12">
                          <ShopImage getShopImage={this.getShopImage} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*
                  <div className="row">
                    <div className="col-lg-12 col-md-12 order-lg-2">
                      <ShopCategoryImage getImage={this.getImage} />
                      <Field
                        name="catimage"
                        component={renderField}
                        type="hidden"
                        className="form-control"
                        label="Name"
                        placeholder="Eg. Healthy"
                      />
                    </div>
                  </div>
                */}
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    </div>
                  </div>
                    
                </div>
              </div>
            </div>

            
          </form>
        </div>
      </div>
    );
  }
}

AddCommunicationMedium = reduxForm({
  form: 'AddCommunicationMediumValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddCommunicationMedium)

export default AddCommunicationMedium;