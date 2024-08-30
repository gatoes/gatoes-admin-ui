import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { couponListByRuleId } from '../../actions/promocodes';
import {DISCOUNT_TYPE} from '../../constants';
import {getCurrencySymbol} from '../../utilities';
import moment from 'moment';

class CouponList extends Component {
  constructor(props){
    super(props);
    this.state = {
      ruleId: this.props.match.params.index,
      detail: null
    };
  }
 
  componentDidMount(){
    couponListByRuleId({'ruleId' : this.state.ruleId}).then((response) => {
      this.setState({
        detail : response.data.data
      });
    })
  }

  render() {
    const {detail} = this.state;
    let currecySymbol = getCurrencySymbol();
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">

            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Coupon List</h4>
              </div>
            </div>
            {
              detail != null
              ?
              <div className="row">
                <div className="col-sm-12">
                  <div className="result-listing">
                    <table>
                      <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Coupon Code</th>
                        <th>Discount</th>
                        <th>Discount Type</th>
                        <th>Max Discount</th>
                        <th>Min Order</th>
                        <th>Uses per coupon</th>
                        <th>Uses per User</th>
                        <th>Life</th>
                        <th>Used</th>
                        <th>Total Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        detail.length > 0 && detail.map((obj, index) => (
                          <tr key={index}>
                            <td>{parseInt(index+1)}</td>
                            <td>{ obj.coupon_code }</td>
                            <td>{ obj.discount }</td>
                            <td>{ DISCOUNT_TYPE[obj.discount_type].label }</td>
                            <td>{ currecySymbol + obj.max_discount }</td>
                            <td>{ currecySymbol + obj.minimum_subtotal }</td>
                            <td>{ obj.uses_per_coupon }</td>
                            <td>{ obj.uses_per_customer }</td>
                            <td>{ obj.start_date ?  moment(obj.start_date).format('MMM Do YYYY') + " - " + moment(obj.end_date).format('MMM Do YYYY') : 'Any Time'}</td>
                            <td>{ obj.used ? obj.used : 0 }</td>
                             <td>{ obj.couponTotalDiscount ? currecySymbol + obj.couponTotalDiscount : 0 }</td>
                          </tr>
                        ))
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


export default CouponList;

