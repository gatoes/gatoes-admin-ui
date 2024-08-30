import React, { Component } from 'react';
import { connect } from 'react-redux';
import RenderNewRestaurantCategoryOptionSlide from './RenderNewRestaurantCategoryOptionSlide';
import { Field } from 'redux-form';

class RenderNewRestaurantCategoryOption extends Component {
  constructor(props) {
    super(props);


    this.state = {
      restcategory : props.restcategory,
      conditionpromo:props.conditionpromo,
      // restaurentList:[],
      hideItemAndCategory:false,
     
    }
    this.handleBroadcast = this.handleBroadcast.bind(this);
  }

  
  componentWillMount(){
    if(this.props.fields.length == 0){
      this.props.fields.push();
    }
  }

  handleBroadcast(e){

    console.log(e,"Received broadcast")
    if(e.target.checked){
      this.setState({
        hideItemAndCategory:true
      })
    }else{
      this.setState({
        hideItemAndCategory:false
      })
    }

  }

  render() {
    const { fields,conditionpromo,restcategory,regionId,zoneId, restaurentList, conditionpromoIndex, meta: { touched, error, submitFailed } } = this.props;
    // console.log(restaurentList,"Heyfields")
    // console.log(this.props,fields,"this.props")
    console.log(conditionpromo,conditionpromoIndex,this.state.hideItemAndCategory,"ConditionPromoCateSlide")
    return (
      <>
        {
        // restaurentList?.length > 0 && (
          fields.map((restcategory, index) => {
            console.log(restcategory,index,"restcategoryThis")
            return(
            <RenderNewRestaurantCategoryOptionSlide conditionpromo={conditionpromo} restaurentList={restaurentList} restcategory={restcategory} conditionpromoIndex={conditionpromoIndex}  index={index} fields={fields} regionId={regionId} zoneId={zoneId} key={index} hideItemAndCategory={this.state.hideItemAndCategory}/>
          )})
          // )
        }
        {/* <div className="row add-more-blocks">
        <div className="form-group ri-block col-lg-6">
              <ul className="cs-check-box">
                <li>
                  <div className="os-check-box">
                   <Field
                    name="isBroadcast"
                    id="isBroadcast"
                    component="input"
                    type="checkbox"
                   onChange={ this.handleBroadcast }

                     />
                    <label for="isBroadcast">Broadcast coupon</label>
                    </div>
                </li>
              </ul>
            </div>
            <div className="col-sm-12">
            
              <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({})}><span className="icon-ic_plus"></span>{"Add more"}</a>
            </div>
          </div> */}
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  return {
    restcategory: state.form.AddNewPromoCodeValue && state.form.AddNewPromoCodeValue.values && state.form.AddNewPromoCodeValue.values.restcategory
  }
}



export default connect(mapStatesToProps)(RenderNewRestaurantCategoryOption);
