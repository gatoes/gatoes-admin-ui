import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { reduxForm, submit, SubmissionError } from 'redux-form';
import {toast} from 'react-toastify';
import { addMenuCategories } from '../../actions/menus';

class AddCategoryFooter extends Component {
  constructor(props){
    super(props);
  }

  submitMenuCategoryForm(values){
    return addMenuCategories(values)
    .then((result) => {
      toast.success('Category updated Successfully.');
      console.log('wewe',result.data);
      this.props.reloadMenuListing();
    }).catch(error => {
      throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
  	return (
    	<> 
        <button type="button" className="btn btn1" data-dismiss="modal">CANCEL</button> 
        <button type="button" className="btn btn2" onClick={this.props.handleSubmit(this.submitMenuCategoryForm.bind(this))}>
          <i className="material-icons"> check_circle</i>SAVE CATEGORY
        </button> 
      </>
  	);
	}
}

export default reduxForm({
  form: 'AddMenuCategoryForm'
})(AddCategoryFooter);