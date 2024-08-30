import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import renderField from "../FormFields/renderField";

import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";

class PromotionCatInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCouponBox: false,
      status: props.status,
    };
    console.log(props,"propsInfo")
  }

 

  componentDidMount(){
    
  }

  
  render() {
    

    return (
      <>
        <div className="fields-ui-block promocode-ui">
          <div className="basic-details">
            <div className="heading">
              <h4>Basic Information</h4>
            </div>
            <div className="form-block">
              <div className="row">
                <div className="col-lg-6">
                  <Field
                    name="title"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Title"
                    placeholder=""
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="code"
                    component={renderField}
                    disabled={this.props.editCatId ?  true : false}
                    type="text"
                    className="form-control"
                    fieldClass="manage-text-case"
                    label="Category Code"
                    placeholder="eg. SWITZ11"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <Field
                    name="basePrice"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Base Price"
                    placeholder=""
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="perClickCharges"
                    component={renderField}
                    type="text"
                    className="form-control"
                    fieldClass="manage-text-case"
                    label="Per Click Charges"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="row">
                
                <div className="col-lg-6">
                  <Field
                    name="minimumDays"
                    component={renderField}
                    type="text"
                    className="form-control"
                    fieldClass="manage-text-case"
                    label="Minimum Days"
                    placeholder="eg. 7"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="limit"
                    component={renderField}
                    type="text"
                    className="form-control"
                    fieldClass="manage-text-case"
                    label="Limit"
                    placeholder="eg. 4"
                  />
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </>
    );
  }
}
PromotionCatInfo = withRouter(PromotionCatInfo);
export default reduxForm({
  form: "AddNewPromotionValue",
})(PromotionCatInfo);
