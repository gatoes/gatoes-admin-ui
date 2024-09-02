// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
// import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
// import renderField from '../FormFields/renderField';
// import renderReactSelect from '../FormFields/renderReactSelect';
// import {toast} from 'react-toastify';
// import validate from './ValidateForm';
// import { addCommunicationType, communicationTypeDetailById } from '../../actions/communication';
// import {NOTIFICATION_TYPE, NOTIFICATION_USER, API_ROOT} from '../../constants';
// import RenderZoneOptoin from './RenderZoneOptoin';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import CSVReader from 'react-csv-reader';
// //import ShopCategoryImage from '../shops/ShopCategoryImage';
// //import { Editor } from '@tinymce/tinymce-react';
// import MessageEditor from "../common/MessageEditor";
// import moment from 'moment';
// import ShopImage from '../shops/ShopImage';

// class EditCommunicationMedium extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userType : 0,
//       isSchedule: false,
//       isCsv: false,
//       csv_records:[],
//       inbox: 0, 
//       msg: '',
//       minTime: null,
//       itemImageUrl : null
//     }
//     this.handleUserType = this.handleUserType.bind(this);
//     this.handleChangeStart = this.handleChangeStart.bind(this);
//     this.handleSchedule = this.handleSchedule.bind(this);
//     this.handleForce = this.handleForce.bind(this);
//     this.handleCsvUpload = this.handleCsvUpload.bind(this);
//     //this.getImage = this.getImage.bind(this);
//     //this.handleEditorChange = this.handleEditorChange.bind(this);
//     this.handleNotificationType = this.handleNotificationType.bind(this);
//     this.getMessage = this.getMessage.bind(this);
//     this.getShopImage = this.getShopImage.bind(this);
//   }

//   componentDidMount(){
//     this.setState({
//       minTime : this.calculateMinTime(new Date())
//     })
//   }

//   calculateMinTime = date => {
//     let isToday = moment(date).isSame(moment(), 'day');
//     if (isToday) {
//         let nowAddOneHour = moment(new Date()).add({hours: 1}).toDate();
//         return nowAddOneHour;
//     }
//     return moment().startOf('day').toDate(); // set to 12:00 am today
//   }

//   getMessage(message){
//     this.props.change('message', message);
//   }

//   // handleEditorChange(e){
//   //   //console.log('aaaaaa', e.target.getContent());
//   //   this.props.change('message', e.target.getContent());
//   // }

//   // getImage(imageId){
//   //   this.props.change('image', imageId);
//   // }

//   handleUserType(e){
//     if(e.value == 1 || e.value == 2){
//       this.setState({
//         userType : 1
//       })
//     } else {
//       this.setState({
//         userType : 0
//       })
//     }
//   }

//   handleNotificationType(e){
//     if(e.value == 1){
//       this.setState({
//         inbox : 1
//       })
//     } else {
//       this.setState({
//         inbox : 0
//       })
//     }
//   }

//   handleSchedule(e){
//     this.setState({
//       isSchedule: !this.state.isSchedule
//     });
//   }

//   handleCsvUpload(e){
//     this.setState({
//       isCsv: !this.state.isCsv
//     });
//   }

//   handleForce(data){
//     this.setState({
//       csv_records: data.flat()
//     });
//     this.props.change('csv_records', this.state.csv_records);
//   }
  
//   // handleChangeStart(sdate){
//   //   // this.setState({
//   //   //   startDate: sdate
//   //   // });
//   //   let isToday = moment(sdate).isSame(moment(), 'day');
//   //   this.setState({
//   //     startDate: sdate,
//   //     minTime: isToday ? this.calculateMinTime(new Date()) : moment().startOf('day').toDate()
//   //   });
//   //   this.props.change('scheduled_time', sdate); 
//   // }

//   handleChangeStart(sdate) {
//     console.log('Selected date:', sdate); // Debugging line
  
//     if (!sdate || isNaN(new Date(sdate))) {
//       console.error('Invalid date selected:', sdate); // Error logging
//       return;
//     }
  
//     let isToday = moment(sdate).isSame(moment(), 'day');
//     this.setState({
//       startDate: sdate,
//       minTime: isToday ? this.calculateMinTime(new Date()) : moment().startOf('day').toDate()
//     });
//     this.props.change('scheduled_time', sdate); 
//   }
  

//   componentWillMount(){
//     communicationTypeDetailById({id : this.props.match.params.index}).then((response) => {
//       this.props.initialize(response.data.data);
//       if(response.data.data.is_scheduled && response.data.data.is_scheduled === true){
//         this.props.change('scheduled_time', response.data.data.scheduled_time);
//         this.setState({
//           isSchedule: true,
//           startDate: response.data.data.scheduled_time,
//           msg: response.data.data.message ? response.data.data.message : null,
//           itemImageUrl: response.data.data.imageUrl && response.data.data.imageUrl.thumbnail ? response.data.data.imageUrl.thumbnail : null
//         });
//       }

//       this.setState({
//         itemImageUrl: response.data.data.imageUrl && response.data.data.imageUrl.thumbnail ? response.data.data.imageUrl.thumbnail : null
//       });
      
//       this.props.change('image', response.data.data.image);

//       if(response.data.data.upload_csv && response.data.data.upload_csv === true){
//         this.setState({
//           isCsv: true
//         });
//       }
//       if((response.data.data.send_inbox && response.data.data.send_inbox === true) || (response.data.data.notificationType && response.data.data.notificationType == "1")){
//         this.setState({
//           inbox: 1
//         });
//       }
//       this.setState({
//         msg: response.data.data.message ? response.data.data.message : null
//       });
//     });
//   }

//   submitMessageForm(values){
//     //console.log('values', values);
//     return addCommunicationType(values)
//     .then((result) => {
//       toast.success('Message setup added Successfully.');
//       this.props.reset();
//       this.props.history.push('/dashboard/managecommunicationmedium');
//     }).catch(error => {
//       //throw new SubmissionError(error.response.data.error);
//     })
//   }

//   getShopImage(imageId){
//     this.props.change('image', imageId);
//   }

//   render() {
//     const {handleSubmit, pristine, submitting} = this.props;
//     const {userType, inbox, msg, itemImageUrl} = this.state;
//     console.log('isSchedule', itemImageUrl);
    
//     return (
//       <div className="container ani-ui-block shop-manager">
//         <div className="row menu-top-block">
//           <div className="col-sm-12 tl-block align-self-center">
//             <h4 className="heading">Edit Communication Type</h4>
//           </div>

//           <form onSubmit={handleSubmit(this.submitMessageForm.bind(this))}>
//             <div className="row">
//               <div className="col-lg-12 col-md-12">
//                 <div className="add-left-block">
                  
//                   <div className="fields-ui-block">
//                     <div className="basic-details">
//                       <div className="heading">
//                         <h4>Details</h4>
//                       </div>
//                       <div className="form-block promocode-ui">
//                         <div className="row">
//                           <div className="col-lg-12">
//                             <Field
//                               name="subject"
//                               component={renderField}
//                               type="text"
//                               className="form-control"
//                               label="Subject"
//                               placeholder="Eg. welcome"
//                             />
//                           </div>
//                         </div>

//                         {
//                           this.state.msg
//                           ?
//                           <MessageEditor getMessage={this.getMessage} msg={msg} />
//                           :
//                           null
//                         }

//                         <div className="row">
//                           <div className="col-lg-6 selectbox-block">
//                             <Field
//                               label="Notification User"
//                               name='notificationUser'
//                               options={NOTIFICATION_USER}
//                               component={renderReactSelect}
//                               placeholder="Select Type"
//                               multi={false}
//                               parentCallback={ this.handleUserType }
//                               parentDivClass="form-group w-100"
//                             />
//                           </div>
//                           <div className="col-lg-6 selectbox-block">
//                             <Field
//                               label="Notification Type"
//                               name='notificationType'
//                               options={NOTIFICATION_TYPE}
//                               component={renderReactSelect}
//                               placeholder="Select Type"
//                               multi={false}
//                               parentDivClass="form-group w-100"
//                               parentCallback={ this.handleNotificationType }
//                             />
//                           </div>
//                         </div>

//                         <FieldArray name="zone" userType={userType} component={RenderZoneOptoin} formProps = {this.props.formProps} />
//                         <div className="row">
//                           {
//                             inbox
//                             ?
//                             <div className="form-group ri-block col-lg-6">
//                               <ul className="cs-check-box">
//                                 <li>
//                                   <div className="os-check-box">
//                                     <Field
//                                       name="send_inbox"
//                                       id="send_inbox"
//                                       component="input"
//                                       type="checkbox"
//                                     />
//                                     <label for="send_inbox">Send to Inbox?</label>
//                                   </div>
//                                 </li>
//                               </ul>
//                             </div>
//                             :
//                             null
//                           }
//                           <div className="form-group ri-block col-lg-6">
//                             <ul className="cs-check-box">
//                               <li>
//                                 <div className="os-check-box">
//                                   <Field
//                                     name="is_scheduled"
//                                     id="promocode_other"
//                                     component="input"
//                                     type="checkbox"
//                                     onClick={ this.handleSchedule }
//                                   />
//                                   <label for="promocode_other">Scheduled ?</label>
//                                 </div>
//                               </li>
//                             </ul>
//                           </div>

//                           {
//                             this.state.isSchedule === true
//                             ?
//                             <div className="col-lg-12">
//                               <div className="form-group">
//                                 <DatePicker
//                                   name="start_date"
//                                   selected={this.state.startDate}
//                                   selectsStart
//                                   startDate={this.state.startDate}
//                                   endDate={this.state.endDate}
//                                   onChange={this.handleChangeStart}
//                                   minDate={new Date()}
//                                   minTime={this.state.minTime}
//                                   maxTime={moment().endOf('day').toDate()}
//                                   showTimeSelect
//                                   timeFormat="HH:mm"
//                                   timeIntervals={15}
//                                   dateFormat="yyyy-MM-dd h:mm aa"
//                                   timeCaption="time"
//                                   placeholderText="Choose scheduled time"
//                                 />
//                                 </div>
//                             </div>
//                             :
//                             null
//                           }
//                         </div>


//                         <div className="row">
                          
//                           <div className="form-group ri-block col-lg-6">
//                             <ul className="cs-check-box">
//                               <li>
//                                 <div className="os-check-box">
//                                   <Field
//                                     name="upload_csv"
//                                     id="upload_csv"
//                                     component="input"
//                                     type="checkbox"
//                                     onClick={ this.handleCsvUpload }
//                                   />
//                                   <label for="upload_csv">Upload user type CSV?</label>
//                                 </div>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>

//                         {
//                           this.state.isCsv === true
//                           ?
//                           <div className="row">
//                             <CSVReader
//                               cssClass="react-csv-input"
//                               label="Upload CSV"
//                               onFileLoaded={this.handleForce}
//                             />
//                             <Field
//                               name="csv"
//                               component={renderField}
//                               type="hidden"
//                             />
//                           </div>
//                           :
//                           null
//                         }
//                       </div>
//                     </div>
//                   </div>
//                   {/*
//                   <div className="row">
//                     <div className="col-lg-12 col-md-12 order-lg-2">
//                       <ShopCategoryImage getImage={this.getImage} />
//                       <Field
//                         name="catimage"
//                         component={renderField}
//                         type="hidden"
//                         className="form-control"
//                         label="Name"
//                         placeholder="Eg. Healthy"
//                       />
//                     </div>
//                   </div>
//                 */}

//                   <div className="col-lg-12 col-md-12">
//                     <ShopImage getShopImage={this.getShopImage} itemImageUrl={this.state.itemImageUrl} />
//                   </div>
                  
//                   <div className="row save-button-block">
//                     <div className="col-sm-12 align-self-center">
//                       <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
//                     </div>
//                   </div>
                    
//                 </div>
//               </div>
//             </div>

            
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// EditCommunicationMedium = reduxForm({
//   form: 'EditCommunicationMediumValue',
//   destroyOnUnmount: true,
//   enableReinitialize: true,
//   keepDirtyOnReinitialize: true,
//   validate
// })(EditCommunicationMedium)

// export default EditCommunicationMedium;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import validate from './ValidateForm';
import { addCommunicationType, communicationTypeDetailById } from '../../actions/communication';
import {NOTIFICATION_TYPE, NOTIFICATION_USER, API_ROOT} from '../../constants';
import RenderZoneOptoin from './RenderZoneOptoin';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CSVReader from 'react-csv-reader';
//import ShopCategoryImage from '../shops/ShopCategoryImage';
//import { Editor } from '@tinymce/tinymce-react';
import MessageEditor from "../common/MessageEditor";
import moment from 'moment';
import ShopImage from '../shops/ShopImage';

class EditCommunicationMedium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 0,
      isSchedule: false,
      isCsv: false,
      csv_records: [],
      inbox: 0, 
      msg: '',
      minTime: null,
      itemImageUrl: null,
      startDate: null,
    };
    this.handleUserType = this.handleUserType.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
    this.handleForce = this.handleForce.bind(this);
    this.handleNotificationType = this.handleNotificationType.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getShopImage = this.getShopImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      minTime: this.calculateMinTime(new Date())
    });
  }

  calculateMinTime = date => {
    let isToday = moment(date).isSame(moment(), 'day');
    if (isToday) {
      let nowAddOneHour = moment(new Date()).add({ hours: 1 }).toDate();
      return nowAddOneHour;
    }
    return moment().startOf('day').toDate();
  }

  getMessage(message) {
    this.props.change('message', message);
  }

  handleUserType(e) {
    this.setState({
      userType: e.value == 1 || e.value == 2 ? 1 : 0
    });
  }

  handleNotificationType(e) {
    this.setState({
      inbox: e.value == 1 ? 1 : 0
    });
  }

  handleSchedule() {
    this.setState({
      isSchedule: !this.state.isSchedule
    });
  }

  handleCsvUpload() {
    this.setState({
      isCsv: !this.state.isCsv
    });
  }

  handleForce(data) {
    this.setState({
      csv_records: data.flat()
    });
    this.props.change('csv_records', this.state.csv_records);
  }

  handleChangeStart(sdate) {
    if (!sdate || isNaN(new Date(sdate))) {
      console.error('Invalid date selected:', sdate);
      this.setState({
        startDate: null,
      });
      return;
    }

    let isToday = moment(sdate).isSame(moment(), 'day');
    this.setState({
      startDate: sdate,
      minTime: isToday ? this.calculateMinTime(new Date()) : moment().startOf('day').toDate()
    });
    this.props.change('scheduled_time', sdate);
  }

  componentWillMount() {
    communicationTypeDetailById({ id: this.props.match.params.index }).then((response) => {
      const data = response.data.data;

      this.props.initialize(data);
      
      const isScheduled = data.is_scheduled && data.is_scheduled === true;
      const imageUrl = data.imageUrl && data.imageUrl.thumbnail ? data.imageUrl.thumbnail : null;

      this.setState({
        isSchedule: isScheduled,
        startDate: isScheduled ? data.scheduled_time : null,
        msg: data.message || null,
        itemImageUrl: imageUrl,
        isCsv: data.upload_csv && data.upload_csv === true,
        inbox: data.send_inbox || data.notificationType === "1" ? 1 : 0,
      });

      this.props.change('image', data.image);
    });
  }

  submitMessageForm(values) {
    return addCommunicationType(values)
      .then((result) => {
        toast.success('Message setup added Successfully.');
        this.props.reset();
        this.props.history.push('/dashboard/managecommunicationmedium');
      }).catch(error => {
        // Handle error here
      });
  }

  getShopImage(imageId) {
    this.props.change('image', imageId);
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const { userType, inbox, msg, itemImageUrl, isSchedule, startDate ,minTime} = this.state;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Edit Communication Type</h4>
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

                        {msg && <MessageEditor getMessage={this.getMessage} msg={msg} />}

                        <div className="row">
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Notification User"
                              name='notificationUser'
                              options={NOTIFICATION_USER}
                              component={renderReactSelect}
                              placeholder="Select Type"
                              multi={false}
                              parentCallback={this.handleUserType}
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
                              parentCallback={this.handleNotificationType}
                            />
                          </div>
                        </div>

                        <FieldArray name="zone" userType={userType} component={RenderZoneOptoin} formProps={this.props.formProps} />
                        <div className="row">
                          {inbox && (
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
                                    <label htmlFor="send_inbox">Send to Inbox?</label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          )}
                          <div className="form-group ri-block col-lg-6">
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="is_scheduled"
                                    id="promocode_other"
                                    component="input"
                                    type="checkbox"
                                    onClick={this.handleSchedule}
                                  />
                                  <label htmlFor="promocode_other">Scheduled?</label>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {isSchedule && (
        <div className="col-lg-12">
          <div className="form-group">
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={this.handleChangeStart}
              minDate={new Date()}
              minTime={minTime}
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
      )}
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
                                    onClick={this.handleCsvUpload}
                                  />
                                  <label htmlFor="upload_csv">Upload user type CSV?</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {this.state.isCsv && (
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
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <ShopImage getShopImage={this.getShopImage} itemImageUrl={itemImageUrl} />
                  </div>
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn">
                        Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}
                      </button>
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

EditCommunicationMedium = reduxForm({
  form: 'EditCommunicationMediumValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditCommunicationMedium);

export default EditCommunicationMedium;
