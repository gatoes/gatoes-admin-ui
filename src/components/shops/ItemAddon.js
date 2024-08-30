import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {toast} from 'react-toastify';
import CSVReader from 'react-csv-reader';
import {addItemAddonCsv} from '../../actions/menus';

class ItemAddon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId: props.shopId,
      csv_records:[]
    }
    this.handleForce = this.handleForce.bind(this);
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
  }

  handleCsvUpload(e){
    this.setState({
      isCsv: !this.state.isCsv
    });
  }

  componentDidMount(){
    console.log('shopId', this.state.shopId);
    this.props.change('shopId', this.state.shopId);
  }

  handleForce(data){
   var keys = data.shift(), i = 0, k = 0, obj = null, output = []; 
    for (i = 0; i < data.length; i++) { 
      obj = {}; 
      for (k = 0; k < keys.length; k++) { 
        obj[keys[k]] = data[i][k]; 
      }
      if(obj.itme_id != '' && obj.itme_id != 'undefined'){
        output.push(obj);   
      } 
    }
    this.setState({
      csv_records: output
    });
    this.props.change('csv_records', this.state.csv_records);
  }

  submitMessageForm(values){
    const {shopId} = this.state;
    return addItemAddonCsv(values)
    .then((result) => {
      toast.success('Item variants added Successfully.');
      //this.props.history.push({'/dashboard/menu'+shopId});
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    console.log('isSchedule', this.state.isSchedule);
    const {userType} = this.state;
    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            
          </div>

          <form onSubmit={handleSubmit(this.submitMessageForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Item Addon Info</h4>
                      </div>
                      <div className="form-block promocode-ui">
                        <div className="row">
                          <CSVReader
                            cssClass="react-csv-input"
                            label="Upload CSV"
                            onFileLoaded={this.handleForce}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn">Submit{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
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

ItemAddon = reduxForm({
  form: 'ItemAddonValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(ItemAddon)

export default ItemAddon;