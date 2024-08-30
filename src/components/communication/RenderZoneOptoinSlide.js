import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { regionListing, deliveryRegionListing } from '../../actions/regions';

class RenderZoneOptoinSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zone : props.zone,
      index: props.index,
      userType: props.userType,
      fields: props.fields,
      zoneList: [],
      deliveryRegion : []
    }
    this.handleDeliveryRegion = this.handleDeliveryRegion.bind(this);
  }

  handleDeliveryRegion (e) {
    deliveryRegionListing({regionId : e.id}).then((response) => {
      this.setState({
        deliveryRegion: response.data.data
      });
    })
  }

  componentDidMount(){
    regionListing().then((response) => {
      this.setState({
        zoneList: response.data.data.region
      });
    })
  }

  

  render() {
    const {shopList, shopCategoryList, zone, index, fields, zoneList, deliveryRegion, userType} = this.state;
    return (
      <div className="row mp-addon">
        <div className="col-sm-12 multiple-ui-addon">
          <Field
            label="Choose Zone"
            name={`${zone}.zoneId`}
            optionLabel='name'
            optionValue='id'
            options={zoneList}
            component={renderReactSelect}
            placeholder="Choose Zone"
            multi={false}
            parentDivClass="form-group w-45"
            parentCallback={ this.handleDeliveryRegion }
          />
          {
            this.props.userType && this.props.userType == 1
            ?
            <Field
              label="Choose Delivery Region"
              name={`${zone}.deliveryRegion`}
              optionLabel='name'
              optionValue='id'
              options={deliveryRegion}
              component={renderReactSelect}
              placeholder="Choose Region"
              multi={true}
              parentDivClass="form-group w-45"
            />
            :
            null
          }
          

          <div className="form-group v-action">
            <div className="delete-varient">
                <a href="javscript:void(0);" onClick={() => fields.remove(index)}><i className="material-icons">clear</i></a>
            </div>
          </div>
          
        </div>
      </div>
    )
  }

}

export default RenderZoneOptoinSlide;