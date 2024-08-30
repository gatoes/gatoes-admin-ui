import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateZoneRestaurantRadius } from '../../actions/shops';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateZoneServiceRadius';
import { toast } from 'react-toastify';

class ManageZoneServiceRadius extends Component {
  constructor(props){
    super(props);
    this.state= {
      regionId: props.regionId,
      index: props.index
    }
  }

  submitMenuForm(values){
    return updateZoneRestaurantRadius({'regionId': this.props.regionId, 'radius': values.radius})
    .then((result) => {
      toast.success('Zone restaurants service radius has been updated successfully.', {
        position: toast.POSITION.TOP_RIGHT
      }); 
      this.props.updateData();
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
    const {handleSubmit, pristine, submitting } = this.props;
    return ( 
       <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
        <div className="modal-body">
          <div className="popup-content-block">
            <div className="row">
               <div className="col-lg-12">
                <Field
                  name="radius"
                  component={renderField}
                  type="number"
                  className="form-control"
                  label="Service Radius"
                />
              </div>
            </div>

          </div>
        </div>
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn">Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
  	);
  }
}

ManageZoneServiceRadius = reduxForm({
  form: 'ManageZoneServiceRadiusValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(ManageZoneServiceRadius)

export default ManageZoneServiceRadius;