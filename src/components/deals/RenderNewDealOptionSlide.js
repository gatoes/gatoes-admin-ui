import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import renderReactSelect from "../FormFields/renderReactSelect";
import { getshopcategoryNew, getmenulistNew } from "../../actions/shops";

import { withRouter } from "react-router-dom";
import renderField from "../FormFields/renderField";

class RenderNewDealOptionSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dealsOn: props.dealsOn,
      index: props.index,
      fields: props.fields,
      shopId:"",
      restaurentCategoryItemList:[],restaurentCategoryList:[],
      freeCategoryItemList:[],freeCategoryList:[],
    };
    this.handleCatItem = this.handleCatItem.bind(this);
    this.handleFreeCatItem = this.handleFreeCatItem.bind(this);
  }

  handleCatItem(e) {
    console.log(e,"eVentDeal")
    const categoryIds = e.map((cat) => cat.id);

   

    if(e.length == 0){
      this.setState({
        restaurentCategoryItemList: [],
      });
    }else{
      getmenulistNew({ shopId:  this.props.match.params.index, categoryId: categoryIds, isDeal:true }).then(
        (response) => {
          this.setState({
            restaurentCategoryItemList: response.data.data.menu,
          });
        }
      );
    }
   
  }

  // function to handle free item category 
  handleFreeCatItem(e,index) {
    let freecategoryIds = e.map((cat) => cat.id);
    console.log(e,"EventcategoryIds")

    if(e.length == 0){
      this.setState({
        freeCategoryItemList: [],
      });
    }else{
      getmenulistNew({ shopId:  this.props.match.params.index, categoryId: freecategoryIds, isDeal:true }).then(
        (response) => {
          this.setState({
            freeCategoryItemList: response.data.data.menu,
          });
        }
      );
    }
   
  }
  



  componentDidMount() {
    getshopcategoryNew({ shopId: [ this.props.match.params.index] }).then((response) => {
      this.setState({
        restaurentCategoryList: response.data.data,
      });
    });
  }

  render() {
    const { dealsOn, index, fields,restaurentCategoryList,restaurentCategoryItemList,freeCategoryItemList } = this.state;

    return (
     
      <div className="row mp-addon">
        <div className="col-sm-12 newpromo_wrap_deals">
          <Field
            label="Choose Category"
            name={`${dealsOn}.category`}
            optionLabel="name"
            optionValue="id"
            options={restaurentCategoryList}
            component={renderReactSelect}
            placeholder="Choose Category"
            multi={true}
            className="select-ui"
            parentDivClass="form-group w-45"
            parentCallback={(e) => this.handleCatItem(e, index)}

          />
          <Field
            label="Choose Item"
            name={`${dealsOn}.item`}
            optionLabel="name"
            optionValue="id"
            options={restaurentCategoryItemList}
            component={renderReactSelect}
            placeholder="Choose Item"
            multi={true}
            className="select-ui"
            parentDivClass="form-group w-45"


          />
          <Field
            name={`${dealsOn}.item_quantity`}
            component={renderField}
            type="number"
            className="form-control"
            label="Buy Item Quantity"
            placeholder="eg. 30"
          />
           <Field
            name={`${dealsOn}.free_item_quantity`}
            component={renderField}
            type="number"
            className="form-control"
            label="Free Item Quantity"
            placeholder="eg. 1"
          />
          </div>
       
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  
  };
};

RenderNewDealOptionSlide = withRouter(RenderNewDealOptionSlide);
export default connect(null, mapDispatchToProps)(RenderNewDealOptionSlide);
