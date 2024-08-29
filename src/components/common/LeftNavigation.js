import React, { Component, Suspense } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {getAclChecks} from '../../utilities';
//import {getRequiredCounter, getRequiredCounterSuccess} from '../../actions/settings';
import { connect } from 'react-redux';
import RequestedCounter from './RequestedCounter';

class LeftNavigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      managePanel: 0,
      orderPanel: 0,
      settingPanel: 0,
      reportingPanel: 0,
      promotionPanel: 0,
      detail: []
    }
    this.setManageStatus = this.setManageStatus.bind(this);
    this.setOrderStatus = this.setOrderStatus.bind(this);
    this.settingStatus = this.settingStatus.bind(this);
    this.reportingStatus = this.reportingStatus.bind(this);
    this.promotionStatus = this.promotionStatus.bind(this);
  }

  setManageStatus(status){
    this.setState({
      managePanel : !status,
      orderPanel: 0,
      settingPanel: 0,
      reportingPanel: 0,
      promotionPanel:0

    })
  }

  setOrderStatus(status){
    this.setState({
      orderPanel : !status,
      managePanel: 0,
      settingPanel: 0,
      reportingPanel: 0,
      promotionPanel:0

    })
  }

  settingStatus(status){
    this.setState({
      settingPanel : !status,
      managePanel: 0,
      orderPanel: 0,
      reportingPanel: 0,
      promotionPanel:0

    })
  }

  reportingStatus(status){
    this.setState({
      reportingPanel : !status,
      managePanel: 0,
      orderPanel: 0,
      settingPanel: 0,
      promotionPanel:0

    })
  }
  promotionStatus(status){
    this.setState({
      settingPanel : 0,
      managePanel: 0,
      orderPanel: 0,
      reportingPanel: 0,
      promotionPanel:!status
    })
  }
  render() {
    const {managePanel, orderPanel, settingPanel, reportingPanel, detail,promotionPanel} = this.state;
    return (
      <div className="sidebar-ui-block">
        <div id="" className="menulist-ui list-group">
          <ul>
          {
            getAclChecks('DASHBOARD')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to="/dashboard">
                <span className="icon-ic_dashboard_inactive"></span>
                <p>Dashboard</p>
              </NavLink>
            </li>
            :
            null
          }
          {
            getAclChecks('ZONE_VIEW_ONLY') || getAclChecks('DELIVERY_REGION_VIEW_ONLY') || getAclChecks('BUSINESS_ZONE_VIEW_ONLY') || getAclChecks('SHOPS_VIEW_ONLY') || getAclChecks('SHOPS_DOCUMENTS') || getAclChecks('SHOP_MENU_VIEW_ONLY') || getAclChecks('SHOP_CATEGORY_VIEW_ONLY') || getAclChecks('RIDERS_VIEW_ONLY') || getAclChecks('RIDERS_DOCUMENTS') || getAclChecks('RIDER_REGION_GROUP_VIEW_ONLY') || getAclChecks('REQUESTED_MENU_ITEM') || getAclChecks('ROLES_VIEW_ONLY') || getAclChecks('STAFF_VIEW_ONLY')
            ?
            <li className="dropdown">
              <a exact activeClassName="active" href="javascript:void(0)" onClick={() => this.setManageStatus(managePanel)} className="nav-link list-group-item">
                <span className="icon-ic_management_inactive"></span>
                <p>Management</p>
              </a>
              <>
              {
                managePanel === true 
                ?
                <ul>
                  {
                    getAclChecks('ZONE_VIEW_ONLY')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/regionlisting'>
                        <p>Zones</p>
                      </NavLink>
                    </li>
                   
                    :
                    null
                  }

                  {
                    getAclChecks('SHOPS_ADD_EDIT')
                    ?
                    <>
                     <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managecuisines'>
                        <p>Cuisines</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managerestaurantbanner'>
                        <p>Restaurant Promo Banner</p>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managetestimonial'>
                        <p>Restaurants Testimonial</p>
                      </NavLink>
                    </li>

                    </>
                    :
                    null
                  }

                  {
                    getAclChecks('SHOPS_VIEW_ONLY')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/shoplisting'>
                       <p>Restaurants</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }

                  {
                    getAclChecks('SHOP_CATEGORY_VIEW_ONLY')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/manageshopcategory'>
                       <p>Restaurant Category</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  
                  {
                    getAclChecks('RIDERS_VIEW_ONLY')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/deliveryagentlisting'>
                       <p>Riders</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  
                  {
                    getAclChecks('REQUESTED_MENU_ITEM')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/requestedmenuitems'>
                        <p>
                          Requested Menu Items
                          <RequestedCounter type='requestedMenuItems' />
                        </p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  
                  
                  {
                    getAclChecks('PLAN_LISTING')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/manageplan'>
                        <p>Subscription Plans</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }

                  {
                    getAclChecks('TAX_LISTING')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managetaxes'>
                        <p>Taxes</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                

                  {
                    getAclChecks('ROLES_VIEW_ONLY')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/manageroles'>
                        <p>Roles</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }

                  {
                    getAclChecks('STAFF_VIEW_ONLY')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managestaff'>
                        <p>Staff</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }

                  
                  
                </ul>
                :
                null
              }
              </>
            </li>
            :
            null
          }


          {
            getAclChecks('ORDERS_LISTING') || getAclChecks('UNASSIGNED_ORDERS_VIEW_ONLY') || getAclChecks('OUT_OF_STOCK_ORDERS') || getAclChecks('ORDERS_LISTING_RESTRICTED')
            ?
            <li className="dropdown">
              <a exact activeClassName="active" href="javascript:void(0)" onClick={() => this.setOrderStatus(orderPanel)} className="nav-link list-group-item">
                <span className="icon-ic_orders_inactive"></span>
                <p>Orders</p>
              </a>

              <>
              {
                orderPanel === true 
                ?
                <ul>
                  {
                    getAclChecks('ORDERS_LISTING') || getAclChecks('ORDERS_LISTING_RESTRICTED')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/orders'>
                        <p>Orders Listing</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  {
                    getAclChecks('UNASSIGNED_ORDERS_VIEW_ONLY')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/unassignedorders'>
                        <p>Unassigned Orders 
                          <RequestedCounter type='unassignedOrder' />
                        </p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  {
                    getAclChecks('OUT_OF_STOCK_ORDERS')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/outofstockorders'>
                        <p>Out of Stock Orders 
                          <RequestedCounter type='outOfStockOrders' />
                        </p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  
                </ul>
                :
                null
              }
              </>
            </li>
            :
            null
          }

          {
            getAclChecks('GENERAL_SETTING') || getAclChecks('REFER_FRIEND_SETTING') || getAclChecks('RIDER_SETTING') || getAclChecks('DELIVERY_CHARGES_SETTING') || getAclChecks('APP_VERSION_SETTING')
            ?
            <li className="dropdown">
              <a exact activeClassName="active" href="javascript:void(0)" onClick={() => this.settingStatus(settingPanel)} className="nav-link list-group-item">
                <span className="icon-ic_settings_inactive"></span>
                <p>Settings</p>
              </a>

              <>
              {
                settingPanel === true 
                ?
                <ul>
                  {
                    getAclChecks('GENERAL_SETTING')
                    ?
                    <>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/settings'>
                        <p>General Settings</p>
                      </NavLink>
                    </li>
                    {/* <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/appsetting'>
                        <p>App Settings</p>
                      </NavLink>
                    </li> */}
                    </>
                    :
                    null
                  }

                  {
                    getAclChecks('REFER_FRIEND_SETTING')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/refertofriendsetting'>
                        <p>Refer to Friend</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  
                  {
                    getAclChecks('RIDER_SETTING')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/driversettings'>
                        <p>Rider Settings</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }

                  {
                    getAclChecks('DELIVERY_CHARGES_SETTING')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/deliverysettings'>
                        <p>Delivery Charges Setting</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  
                </ul>
                :
                null
              }
              </>
            </li>
            :
            null
          }

          {
            getAclChecks('RIDER_REPORTING') || getAclChecks('MERCHANT_REPORTING') || getAclChecks('CUSTOMER_REPORTING') || getAclChecks('ORDER_REPORTING') || getAclChecks('HOURLY_ORDER_REPORTING')
            ?
            <li className="dropdown">
              <a exact activeClassName="active" href="javascript:void(0)" onClick={() => this.reportingStatus(reportingPanel)} className="nav-link list-group-item">
                <span className="icon-ic_report"></span>
                <p>Reporting</p>
              </a>

              <>
              {
                reportingPanel === true 
                ?
                <ul>
                  {
                    getAclChecks('RIDER_REPORTING')
                    ?
                    <>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/riderreporting'>
                        <p>Rider</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/ridercashreporting'>
                        <p>Rider COD</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/ridewithus'>
                        <p>Ride With Us</p>
                      </NavLink>
                    </li>
                    </>

                    :
                    null
                  }
                  {
                    getAclChecks('MERCHANT_REPORTING')
                    ?
                    <>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/merchantreporting'>
                        <p>Merchant</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/partnerwithus'>
                        <p>Partner With Us</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/bestsellingitemsreporting'>
                        <p>Best Selling Items</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/merchantfinancereporting'>
                        <p>Merchant Finance</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/payoutrequests'>
                        <p>Merchant Payout Requests</p>
                      </NavLink>
                    </li>
                    </>
                    :
                    null
                  }
                  {
                    getAclChecks('CUSTOMER_REPORTING')
                    ?
                    <>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/customerreporting'>
                        <p>Users</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/walletreporting'>
                        <p>Wallet</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/refundreporting'>
                        <p>Refund</p>
                      </NavLink>
                    </li>
                    </>
                    :
                    null
                  }
                  {
                    getAclChecks('ORDER_REPORTING')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/orderreporting'>
                        <p>Orders</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  {
                    getAclChecks('HOURLY_ORDER_REPORTING')
                    ?
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/orderhourlyreporting'>
                        <p>Hourly Orders</p>
                      </NavLink>
                    </li>
                    :
                    null
                  }
                  {/*
                  <li>
                    <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/logs'>
                      <p>Logs</p>
                    </NavLink>
                  </li>
                */}
                </ul>
                :
                null
              }
              </>
            </li>
            :
            null
          }

          {
            getAclChecks('CUSTOMER_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/customers'>
                <span className="icon-ic_customers"></span>
                <p>Users</p>
              </NavLink>
            </li>
            :
            null
          }

{
            getAclChecks('CUSTOMER_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managestatus'>
                <span className="icon-ic_customers"></span>
                <p>Manage Users Status</p>
              </NavLink>
            </li>
            :
            null
          }
 
        <li className="dropdown">
              <a exact activeClassName="active" href="javascript:void(0)"
               onClick={() => this.promotionStatus(promotionPanel)} 
               className="nav-link list-group-item">
                <span className="icon-ic_settings_inactive"></span>
                <p>Promotion</p>
              </a>
              {
                promotionPanel === true 
                ?
              <>
             
                <ul>
                    <>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/couponrequests'>
                        <p>Coupon Requests</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/dealrequests'>
                        <p>Deal Requests</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/broadcastrequests'>
                        <p>BroadCast Requests</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/promotionsetting'>
                        {/* <p>Manage Promotions</p> */}
                        <p>Promotion Setting</p>
                      </NavLink>
                    </li>
                    </>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/newpromocodes'>
                        <p>New Promotion Zone</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/deals'>
                        <p>Create Deals</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/promotion/ads/add'>
                        <p>Create Ads Promotions</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/promotioncategory'>
                        {/* <p>Promotion Setting</p> */}
                        <p>Promotion Category</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/enrollmentrequest'>
                        <p>Enrollment Request</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/promotionreporting'>
                        <p>Reporting</p>
                      </NavLink>
                    </li>
                    
                  
                </ul>
               
              </>
              :null}
            </li>


{/* {
            getAclChecks('CUSTOMER_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/couponrequests'>
                <span className="icon-ic_customers"></span>
                <p>Coupon Requests</p>
              </NavLink>
            </li>
            :
            null
          }
{
            getAclChecks('CUSTOMER_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managepromotion'>
                <span className="icon-ic_customers"></span>
                <p>Manage Promotions</p>
              </NavLink>
            </li>
            :
            null
          } */}

          {/* {
            getAclChecks('PROMOCODE_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/promocodes'>
                <span className="icon-ic_promocode_inactive"></span>
                <p>Promotion Zone</p>
              </NavLink>
            </li>
            :
            null
          } */}
            {/* {
            getAclChecks('PROMOCODE_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/newpromocodes'>
                <span className="icon-ic_promocode_inactive"></span>
                <p>New Promotion Zone</p>
              </NavLink>
            </li>
            :
            null
          }
  {
            getAclChecks('PROMOCODE_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/promotionsetting'>
                <span className="icon-ic_promocode_inactive"></span>
                <p>Promotion Setting</p>
              </NavLink>
            </li>
            :
            null
          } */}

          {
            getAclChecks('BROADCAST_MESSAGE_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managecommunicationmedium'>
               <span className="icon-ic_broadcast_inactive"></span>
                <p>Broadcast Message</p>
              </NavLink>
            </li>
            :
            null
          }

          {
            getAclChecks('FAQ_VIEW_ONLY')
            ?
            <li>
              <NavLink exact activeClassName="active" className="nav-link list-group-item" to='/dashboard/managefaq'>
              <span className="icon-ic_faq"></span>
                <p>FAQ</p>
              </NavLink>
            </li>
            :
            null
          }
          <li>
            <NavLink className="nav-link list-group-item" to='/logout'>
              <span className="icon-logout"></span>
              <p>Log Out</p>
            </NavLink>
          </li>
        </ul>
        </div>
      </div>
    );
  }
}


export default LeftNavigation;