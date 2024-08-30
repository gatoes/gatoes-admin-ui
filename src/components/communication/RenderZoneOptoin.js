import React, { Component } from 'react';
import { connect } from 'react-redux';
import RenderZoneOptoinSlide from './RenderZoneOptoinSlide';

class RenderZoneOptoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zone : props.zone,
      userType: props.userType
    }
  }

  // componentWillMount(){
  //   if(this.props.fields.length == 0){
  //     this.props.fields.push();
  //   }
  // }

  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;
    const {userType} = this.state;
    return (
      <>
        {
          fields.map((zone, index) => {
            return(
            <RenderZoneOptoinSlide zone={zone} index={index} userType={this.props.userType} fields={fields} />
          )})
        }
        <div className="row add-more-blocks">
            <div className="col-sm-12">
              <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({})}><span className="icon-ic_plus"></span>Add Zone</a>
            </div>
          </div>
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  return {
    restcategory: state.form.AddPromoCodeValue && state.form.AddPromoCodeValue.values && state.form.AddPromoCodeValue.values.restcategory
  }
}

export default connect(mapStatesToProps)(RenderZoneOptoin);