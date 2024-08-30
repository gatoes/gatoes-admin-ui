import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import CheckboxGroup2 from '../FormFields/CheckboxGroup2';
import {toast} from 'react-toastify';
import validate from './ValidateRegionGroup';
import { getDeliveryRegionGroup } from '../../actions/regions';
import { addDeleveryRegionGroup, getDeliveryRegionGroupById } from '../../actions/deliveryagent';

class EditDriverRegionGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryRegion: []
    }
  }

  componentDidMount(){
    getDeliveryRegionGroup({groupId : this.props.match.params.index}).then((response) => {
      this.setState({
        deliveryRegion: response.data.data
      });
    })
  }

  componentWillMount(){
    getDeliveryRegionGroupById({groupId : this.props.match.params.index}).then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    return addDeleveryRegionGroup(values)
    .then((result) => {
      toast.success('Group updated Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/driverregiongroups');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const { deliveryRegion} = this.state;
    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add New Region Group</h4>
          </div>

          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Basic Details</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-12">
                            <Field
                              name="groupName"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Name"
                              placeholder="Eg. Alpha"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group ri-block custom-check-ui">
                              <label>Delivery Region</label>
                              <Field
                               name="deliveryRegion"
                               component={CheckboxGroup2}
                               type="checkbox"
                               options={deliveryRegion}
                             />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
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

EditDriverRegionGroup = reduxForm({
  form: 'AddDriverRegionGroupValue',
  destroyOnUnmount: false,
  validate
})(EditDriverRegionGroup)

export default EditDriverRegionGroup;