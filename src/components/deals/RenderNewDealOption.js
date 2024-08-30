import React, { Component } from "react";
import { connect } from "react-redux";
import RenderNewDealOptionSlide from "./RenderNewDealOptionSlide";
import { Field } from "redux-form";
import renderField from "../FormFields/renderField";

class RenderNewDealOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dealsOn: props.dealsOn,
    };
  }

  componentWillMount() {
    if (this.props.fields.length == 0) {
      this.props.fields.push();
    }
  }

  render() {
    const {
      fields,
      dealsOn,
      meta: { touched, error, submitFailed },
    } = this.props;
    return (
      <>
        {fields.map((dealsOn, index) => {
          // console.log(dealsOn, index, "dealsOn");
          return (
            <div className="fields-ui-block promocode-ui action_ui">
              <div className="basic-details">
                <div className="condition_wrap_header">
                  <div className="heading">
                    <h4>Deal {+ " " + (index + 1)}</h4>
                  </div>
                  {index > 0 && (
                    <div className="form-group mb-0">
                      <div className="delete-varient delete_btn">
                        <a
                          href="javscript:void(0);"
                          onClick={() => fields.remove(index)}
                        >
                          <i className="material-icons">clear</i>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="form-block">
                  <RenderNewDealOptionSlide
                    dealsOn={dealsOn}
                    index={index}
                    fields={fields}
                    key={index}
                  />
                 <Field
                   label="Name"
                    name="global"
                     component={renderField}
                      placeholder="Enter name"
                     className="form-control"
                    parentDivClass="form-group w-100"
                    type="hidden"
                            />
                </div>
              </div>
            </div>
          );
        })}
        <div className="row add-more-condition-block">
          <div className="col-sm-12">
            <a
              href="javascript:void(0);"
              className="btn add-text-btn ad-btn"
              onClick={() => fields.push({})}
            >
              <i className="material-icons">add_circle_outline</i>
              Add more
            </a>
          </div>
        </div>
      </>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    dealsOn:
      state.form.AddNewDealValue &&
      state.form.AddNewDealValue.values &&
      state.form.AddNewDealValue.values.dealsOn,
  };
};

export default connect(mapStatesToProps)(RenderNewDealOption);
