import React, { Component } from "react";
import {
  Field,
} from "redux-form";
import renderReactSelect from "../FormFields/renderReactSelect";
import {  newBusinessZoneListing } from "../../actions/regions";

class RenderBusinessZoneCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessZoneList: [],
    };
  }

  componentDidMount() {
    newBusinessZoneListing().then((response) => {
      this.setState({
        businessZoneList: response.data.data,
      });
    });
  }

  render() {
    const { businessZoneList } = this.state;

    return (
      <div className="fields-ui-block">
        <div className="basic-details">
          <div className="heading">
            <h4>Business Zone Condition</h4>
          </div>
          <div className="form-block">
            <div className="row">
              <div className="col-lg-12 selectbox-block">
                <Field
                  label="Business Zone"
                  name={`business_zone`}
                  optionLabel="name"
                  optionValue="id"
                  options={businessZoneList}
                  component={renderReactSelect}
                  placeholder="Select Promotion Zone"
                  multi={true}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RenderBusinessZoneCondition;
