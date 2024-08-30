import React, { Component } from "react";
import { Field, FieldArray,reduxForm } from "redux-form";
import { getRestaurentNew, getdeliveryregionsNew, regionListing } from "../../actions/regions";
import { connect } from "react-redux";
import RenderNewRestaurantCategoryOption from "./RenderNewRestaurantCategoryOption"; // Adjust the path as needed
import renderReactSelect from "../FormFields/renderReactSelect";
import { regionObjectSuccess, shopObjectSuccess, zoneObjectSuccess } from "../../actions/newpromocodes";
import ValidateNewPromoCode from "./ValidateNewPromoCode";
import { withRouter } from "react-router-dom";
import RenderNewRestaurantCategoryOptionEdit from "./RenderNewRestaurantCategoryOptionEdit";

class RenderCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionListing: [],
      regionList:[],
      restaurentList:[],
      zoneId:'',
      regionId:'',
      isAction:false,
      conditionpromo: props.conditionpromo,
      isBroadcast: props.isBroadcast,
    };
    this.handleRegions = this.handleRegions.bind(this)
    this.handleRestaurent = this.handleRestaurent.bind(this)
  }

  componentDidMount() {
    regionListing().then((response) => {
      // console.log(response,"regionListing")
      this.setState({
        regionListing: response.data.data.region,
      });
    });
    getdeliveryregionsNew().then((response) => {
      this.setState({
        regionList: response.data.data
      });
    });
    getRestaurentNew().then((response) => {
      // console.log(response,"responseRestaurent")
      this.setState({
        restaurentList:response.data.data.shop
      })
    })
    if (this.props.match.params.index){
        this.setState({
          isAction: true
        })
    
    }
  }

  handleRegions(e){

    this.props.zoneObjectSuccess(e)
    getdeliveryregionsNew({regionId:[e.id]}).then((response) => {
      this.setState({
        regionList: response.data.data,
        zoneId:e.id,
      });
    })
    getRestaurentNew({zone:[e.id]}).then((response) => {
      this.setState({
        restaurentList: response.data.data.shop,
        regionId:e.id
      });
    })
  }

  componentWillMount() {
    if (this.props.fields && this.props.fields.length == 0) {
      this.props.fields.push();
    }
  }

  handleRestaurent(selectedRegions){
    // console.log(selectedRegions,"HeyCallback")
    this.props.regionObjectSuccess(selectedRegions[0])
    const regionIds = selectedRegions.map(region => region.id);
    // console.log(regionIds,this.state.zoneId,"HeyCallbak1")
    const zoneIds = selectedRegions.map(zone => zone.zoneId)
    
    getRestaurentNew({zone:zoneIds, delivery_region:regionIds}).then((response) => {
      this.setState({
        restaurentList: response.data.data.shop,
        regionId:regionIds
      });
      // if(selectedRegions?.length == 0){
      this.props.shopObjectSuccess()
      // }
    })
    
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps,"nextProps111")
    if (nextProps.restaurentList !== this.props.restaurentList) {
      this.setState({ restaurentList: nextProps.restaurentList });
    }
    if (nextProps.isBroadcast !== this.props.isBroadcast) {
      this.setState({ isBroadcast: nextProps.isBroadcast });
    }
  }
  
  
  render() {
    const { regionListing,regionList,restaurentList,isBroadcast } = this.state;
    const { formProps } = this.props;
    const {
      fields,
      meta: { touched, error, submitFailed },
    } = this.props;

    // console.log(fields, "fields");
    // console.log(restaurentList,"restaurentList")
    // console.log(this.props.conditionpromo,this.state.zoneId,"this.propsCondition")
    
    // const hasCondition = Array.isArray(this.props.conditionpromo) && this.props.conditionpromo.length > 0;

    // // Check if there is a restaurant or a zone
    // let hasRestaurantOrZone = false;

    // if (hasCondition) {
    //     const firstItem = this.props.conditionpromo[0];

    //     if (firstItem && typeof firstItem === 'object') {
    //         const { restcategory, zone } = firstItem;

    //         if (restcategory && Array.isArray(restcategory) && restcategory[0] && restcategory[0] !== null && restcategory[0].restaurant && restcategory[0].restaurant.length > 0) {
    //             hasRestaurantOrZone = true;
    //         } else if (zone) {
    //             hasRestaurantOrZone = true;
    //         }
    //     }
    // }
    console.log(this.props.conditionpromo,isBroadcast, "this.propsCondition");

    return (
      <>
        {fields.map((conditionpromo, index) => {
          return (
            <div className="fields-ui-block promocode-ui" key={index}>
              <div className="basic-details">
                <div className="condition_wrap_header">
                    <div className="heading">
                    <h4>Conditions</h4>
                    </div>
                    {index > 0 && (
                    <div className="form-group v-action">
                      <div className="delete-varient">
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
                  <div className="row">
                    <div className="col-lg-6">
                      <Field
                        label="Zone"
                        name={`${conditionpromo}.zone`}
                        optionLabel="name"
                        optionValue="id"
                        options={regionListing}
                        component={renderReactSelect}
                        placeholder="Select Zone"
                        multi={false}
                        className="select-ui"
                        parentDivClass="form-group w-100"
                        isClearable={true}
                        parentCallback={(e) =>  this.handleRegions(e) }
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Region"
                        name={`${conditionpromo}.region`}
                        optionLabel="name"
                        optionValue="id"
                        options={regionList}
                        component={renderReactSelect}
                        placeholder="Select Region"
                        multi={true}
                        clearable={true}
                        className="select-ui"
                        parentDivClass="form-group w-100"
                        parentCallback={(regions) =>  this.handleRestaurent(regions) }

                      />
                    </div>
                  </div>
                  { isBroadcast !== 2 && (                    // restaurentList.length > 0 &&
                  <FieldArray
                    name={`${conditionpromo}.restcategory`}
                    component={ this.props.match.params.index ? RenderNewRestaurantCategoryOptionEdit : RenderNewRestaurantCategoryOption}
                    conditionpromo={this.props.conditionpromo}
                    restaurentList={this.state.restaurentList}
                    formProps={formProps}
                    conditionpromoIndex={index}
                    zoneId={this.state.zoneId}
                    regionId={this.state.regionId}
                  />
                )

                }
                </div>
              </div>
            </div>
          );
        })}
         {/* <Field
          name="global"
          component={renderField}
           type="hidden"
          className="form-control"
           /> */}
        <div className="row add-more-condition-block">
          <div className="col-sm-12">
        {/* {hasRestaurantOrZone && ( */}
            <a
              href="javascript:void(0);"
              className={`btn add-text-btn ad-btn `}
              onClick={() => fields.push({})}
            >
              <span className="icon-ic_plus"></span>Add more condition
            </a>
            {/* )} */}
          </div>
        </div>
      </>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  console.log(state.NewPromoCode.isBroadCast, "StateBroadcast")
  return {
    restcategory:
      state.form.AddNewPromoCodeValue &&
      state.form.AddNewPromoCodeValue.values &&
      state.form.AddNewPromoCodeValue.values.restcategory,
    conditionpromo:
      state.form.AddNewPromoCodeValue &&
      state.form.AddNewPromoCodeValue.values &&
      state.form.AddNewPromoCodeValue.values.conditionpromo, 
      isBroadcast:state.NewPromoCode.isBroadCast
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    regionObjectSuccess:(payload) => {
      dispatch(regionObjectSuccess(payload))
    },
    zoneObjectSuccess:(payload) => {
      dispatch(zoneObjectSuccess(payload))
    },
    shopObjectSuccess:(payload) => {
      dispatch(shopObjectSuccess(payload))
    }
  };
}
RenderCondition = withRouter(RenderCondition);

export default connect(mapStatesToProps,mapDispatchToProps)(RenderCondition);

// RenderCondition = reduxForm({
//   form: 'AddNewPromoCodeValue', 
//   validate: ValidateNewPromoCode, 
// })(RenderCondition);