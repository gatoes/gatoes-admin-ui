import React, { Component } from 'react';
import { connect } from 'react-redux';
import RenderNewRestaurantCategoryOptionSlide from './RenderNewRestaurantCategoryOptionSlide';

class RenderNewRestaurantCategoryOptionEdit extends Component {
  constructor(props) {
    super(props);


    this.state = {
      restcategory : props.restcategory,
      conditionpromo:props.conditionpromo
      // restaurentList:[],
     
    }
    //this.handleShops = this.handleShops.bind(this);
  }

  
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.restaurentList !== this.props.restaurentList) {
  //     this.setState({ restaurentList: nextProps.restaurentList });
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.conditionpromo !== prevState.conditionpromo) {
        return {
          conditionpromo: nextProps.conditionpromo
        };
      }
      return null;
    
  }

  // componentDidUpdate(prevProps) {
  //   const { match: { params: { index: prevIndex } } } = prevProps;
  //   const { match: { params: { index } }, conditionpromo } = this.props;

  //   if (index && index !== prevIndex) {
  //     this.setState({ conditionpromo });
  //   }
  // }
  
  componentWillMount(){
    if(this.props.fields.length == 0){
      this.props.fields.push();
    }
  }

  render() {
    const { fields,conditionpromo,restcategory,regionId,zoneId, restaurentList, conditionpromoIndex, meta: { touched, error, submitFailed } } = this.props;
    // console.log(restaurentList,"Heyfields")
    // console.log(this.props,fields,"this.props")
    console.log(conditionpromo,conditionpromoIndex,"ConditionPromoCateSlide")
    return (
      <>
        {
        // restaurentList?.length > 0 && (
          fields.map((restcategory, index) => {
            console.log(restcategory,index,"restcategoryThis")
            return(
            <RenderNewRestaurantCategoryOptionSlide conditionpromo={conditionpromo} restaurentList={restaurentList} restcategory={restcategory} conditionpromoIndex={conditionpromoIndex}  index={index} fields={fields} regionId={regionId} zoneId={zoneId} key={index} />
          )})
          // )
        }
        <div className="row add-more-blocks">
            <div className="col-sm-12">
              <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({})}><span className="icon-ic_plus"></span>{"Add more"}</a>
            </div>
          </div>
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  return {
    restcategory: state.form.AddNewPromoCodeValue && state.form.AddNewPromoCodeValue.values && state.form.AddNewPromoCodeValue.values.restcategory
  }
}



export default connect(mapStatesToProps)(RenderNewRestaurantCategoryOptionEdit);
