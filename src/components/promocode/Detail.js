import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { promoRuleDetail } from '../../actions/promocodes';
import {DISCOUNT_TYPE} from '../../constants';
import moment from 'moment';
//import PromoCodeSlide from './PromoCodeSlide';

class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      ruleId: this.props.match.params.index,
      detail: null
    };
  }
 
  componentDidMount(){
    promoRuleDetail({'ruleId' : this.state.ruleId}).then((response) => {
      this.setState({
        detail : response.data.data
      });
    })
  }

  render() {
    const {detail} = this.state;
    //console.log('detail', detail);
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">

            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Promo Code Detail</h4>
              </div>
            </div>
            {
              detail != null
              ?
              <div className="row">
                <div className="col-sm-12">
                  <div className="result-listing">
                    <table>
                      <tbody>
                        <tr><td>Name : </td><td>{detail.name }</td></tr>
                        <tr><td>Duration Days : </td><td>{detail.start_date == null ? 'All Days' : moment.utc(detail.start_date).local().format("MMM Do YYYY") + " - " + moment.utc(detail.end_date).local().format("MMM Do YYYY")}</td></tr>
                        <tr><td>Time : </td><td>{detail.start_time == null ? '24 hrs' : detail.start_time + ' - ' + detail.end_time }</td></tr>
                        <tr><td>Discount Type: </td><td>{detail.discount_type == null ? null : DISCOUNT_TYPE[detail.discount_type].label }</td></tr>
                        <tr><td>Discount : </td><td>{detail.discount ? detail.discount : 0}</td></tr>
                        <tr><td>Max Discount : </td><td>{detail.max_discount ? detail.max_discount : null}</td></tr>
                        <tr><td>Minimum Subtotal : </td><td>{detail.minimum_subtotal ? detail.minimum_subtotal : 0}</td></tr>
                        <tr><td>Promocode with other : </td><td>{detail.promocode_with_other ? 'Yes' : 'No'}</td></tr>
                        <tr><td>Uses per coupon : </td><td>{detail.uses_per_coupon ? detail.uses_per_coupon : 0 }</td></tr>
                        <tr><td>Uses per user : </td><td>{detail.uses_per_customer ? detail.uses_per_customer : 0 }</td></tr>
                        <tr><td>Business Zone : </td><td>{(detail.businessZone && (detail.businessZone.length > 0)) ? detail.businessZone.toString() : ''}</td></tr>
                        
                        {
                          detail.restaurant && detail.restaurant.length > 0
                          ?
                          detail.restaurant.map((obj, index) => (
                            <>
                            <tr><td>Restaurant : </td><td>{obj.shopName}</td></tr>
                            <tr><td>Restaurant Category : </td><td>{obj.categoryName ? obj.categoryName.toString() : 'All Category'}</td></tr>
                            </>
                          ))
                          :
                          <tr><td>Restaurants : </td><td>All Restaurants</td></tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              :
              null
            }
            
                  
          </div>
        </div>
      </div>
    );
  }
}


export default Detail;

