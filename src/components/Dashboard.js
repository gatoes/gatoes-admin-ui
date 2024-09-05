import React, { Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {authentication} from '../utilities';
import ContentLoader from './ContentLoader';
import Footer from './Footer';
import {ROUTES} from '../routes';
import Header from './common/Header';
import LeftNavigation from './common/LeftNavigation';
import RenderRemoteComponent from '../RenderRemoteComponent';
import ACLRoute from '../ACLRoute';
//import {getNotificationCounter} from '../actions/notifications';
import {updateOrderListingSocket} from '../actions/orders';
import {updateRiderStatusSocket} from '../actions/deliveryagent';
import * as io from "socket.io-client";
import PageLoader from './common/PageLoader';

class Dashboard extends Component {
    constructor(props){
      super(props);
      // this.socket = io.connect(`gatoes.com:3001?token=${window.localStorage.jwtToken || ' '}`);
      this.socket = io.connect(`localhost:3010?token=${window.localStorage.jwtToken || ' '}`);
    }
    
    componentDidMount(){
        this.socket.on("error", message => {
          console.log('error',message);
        });
        this.socket.on("disconnect", message => {
          console.log('disconnect',message);
        });
        this.socket.on("connecting", message => {
          console.log('connecting',message);
        });
        this.socket.on("errorfromserver", message => {
          console.log('error',message);
        });
        // this.socket.on("adminNotification", message => {
        //   console.log('success',message);
        //   this.props.getNotificationCounter(message);
        // });
        this.socket.on("orderListingUpdate", message => {
          console.log('success socket',message);
          this.props.updateOrderListingSocket(message);
        });
        this.socket.on("riderStatusUpdate", message => {
          console.log('success socket',message);
          this.props.updateRiderStatusSocket(message);
        });
    }
  
  render() {
    if(!authentication()){
        return <Redirect to='/login'/>
    }

    return (
      <div className="wrapper-block">
        <Header />
         <PageLoader />
          <div className="orders-ui-block">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4 leftmenu">
                  <LeftNavigation />
                </div>
                <div className="col-lg-9 col-md-12 admin-right-ui">
                  <Suspense fallback={<ContentLoader />}>
                    <Route {...ROUTES.DASHBOARDANALYTICS} />
                    <ACLRoute {...ROUTES.MANAGEREGIONS} />
                    <ACLRoute {...ROUTES.ADDNEWREGIONS} />
                    <ACLRoute {...ROUTES.EDITNEWREGIONS} />
                    <ACLRoute {...ROUTES.MANAGEDELIVERYREGION} />
                    <ACLRoute {...ROUTES.MANAGEBUSINESSZONE} />
                    <ACLRoute {...ROUTES.MANAGESHOPS} />
                    <ACLRoute {...ROUTES.ADDNEWSHOP} />
                    <ACLRoute {...ROUTES.EDITSHOP} />
                    <ACLRoute {...ROUTES.ONBOARDING} />
                    <ACLRoute {...ROUTES.ONBOARDINGDOCSLISTING}/>
                    <ACLRoute {...ROUTES.MANAGEDELIVERYAGENT} />
                    <ACLRoute {...ROUTES.ADDNEWDELIVERYAGENT} />
                    <ACLRoute {...ROUTES.EDITDELIVERYAGENT} />
                    <ACLRoute {...ROUTES.ORDERSLISTING} />
                    <ACLRoute {...ROUTES.UNASSIGNEDORDERSLISTING} />
                    <ACLRoute {...ROUTES.SETTING} />
                    <ACLRoute {...ROUTES.DRIVERSETTING} />
                    <ACLRoute {...ROUTES.EDITMENUITEM} />
                    <ACLRoute {...ROUTES.ADDMENUITEM} />
                    <ACLRoute {...ROUTES.MENU} />
                    <ACLRoute {...ROUTES.REQUESTEDMENUITEMS} />
                    <ACLRoute {...ROUTES.DELIVERYSETTING} />
                    <ACLRoute {...ROUTES.ADDDELIVERYSETTING} />
                    <ACLRoute {...ROUTES.EDITDELIVERYSETTING} />
                    <ACLRoute {...ROUTES.OUTOFSTOCKORDERS} />
                    <ACLRoute {...ROUTES.OUTOFSTOCKORDERBYID} />
                    <ACLRoute {...ROUTES.PROMOCODE} />
                    <ACLRoute {...ROUTES.ADDPROMOCODE} />
                    <ACLRoute {...ROUTES.EDITPROMOCODE} />
                    <ACLRoute {...ROUTES.RIDERDOCSLISTING} />
                    <ACLRoute {...ROUTES.SHOPDOCSLISTING} />
                    <ACLRoute {...ROUTES.SHOPDOCSLISTINGAADHAR}/>
                    <ACLRoute {...ROUTES.DRIVERREGIONGROUP} />
                    <ACLRoute {...ROUTES.ADDDRIVERREGIONGROUP} />
                    <ACLRoute {...ROUTES.EDITDRIVERREGIONGROUP} />
                    <ACLRoute {...ROUTES.MANAGEROLES} />
                    <ACLRoute {...ROUTES.ADDROLES} />
                    <ACLRoute {...ROUTES.EDITROLES} />
                    <ACLRoute {...ROUTES.MANAGESTAFF} />
                    <ACLRoute {...ROUTES.ADDSTAFF} />
                    <ACLRoute {...ROUTES.EDITSTAFF} />
                    <ACLRoute {...ROUTES.RIDERREPORTING} />
                    <ACLRoute {...ROUTES.MERCHANTREPORTING} />
                    <ACLRoute {...ROUTES.CUSTOMERREPORTING} />
                    <ACLRoute {...ROUTES.ORDERREPORTING} />
                    <ACLRoute {...ROUTES.PROMOCODEDETAIL} />
                    <ACLRoute {...ROUTES.COUPONLISTBYRULEID} />
                    <ACLRoute {...ROUTES.MANAGECOMMUNICATIONMEDIUM} />
                    <ACLRoute {...ROUTES.ADDCOMMUNICATIONMEDIUM} />
                    <ACLRoute {...ROUTES.EDITCOMMUNICATIONMEDIUM} />
                    <ACLRoute {...ROUTES.MANAGESHOPCATEGORY} />
                    <ACLRoute {...ROUTES.ADDSHOPCATEGORY} />
                    <ACLRoute {...ROUTES.EDITSHOPCATEGORY} />
                    <ACLRoute {...ROUTES.LOGSREPORTING} />
                    <ACLRoute {...ROUTES.ORDERHOURLYREPORTING} />
                    <ACLRoute {...ROUTES.SHOPITEMCSV} />
                    <ACLRoute {...ROUTES.MANAGEFAQ} />
                    <ACLRoute {...ROUTES.ADDFAQ} />
                    <ACLRoute {...ROUTES.EDITFAQ} />
                    <ACLRoute {...ROUTES.APPVERSION} />
                    <ACLRoute {...ROUTES.CUSTOMERS} />
                    <ACLRoute {...ROUTES.RIDERGEOMAPLOCATION} />
                    <ACLRoute {...ROUTES.REFERFRIENDSETTING} />
                    <ACLRoute {...ROUTES.USERAPPSETTING} />
                    <ACLRoute {...ROUTES.RIDERCASHREPORTING} />
                    <ACLRoute {...ROUTES.MANAGECUISINES} />
                    <ACLRoute {...ROUTES.BESTSELLINGITEMREPORTING} />
                    <ACLRoute {...ROUTES.MANAGEGALLERY} />
                    <ACLRoute {...ROUTES.ADDGALLERY} />
                    <ACLRoute {...ROUTES.EDITGALLERY} />
                    <ACLRoute {...ROUTES.MANAGERESTAURANTBANNER} />
                    <ACLRoute {...ROUTES.ADDRESTAURANTBANNER} />
                    <ACLRoute {...ROUTES.EDITRESTAURANTBANNER} />
                    <ACLRoute {...ROUTES.MANAGESUPERMERCHANT} />
                    <ACLRoute {...ROUTES.ADDSUPERMERCHANT} />
                    <ACLRoute {...ROUTES.EDITSUPERMERCHANT} />
                    <ACLRoute {...ROUTES.WALLETREPORTING} />
                    <ACLRoute {...ROUTES.PARTNERWITHUS} />
                    <ACLRoute {...ROUTES.MANAGETESTIMONIAL} />
                    <ACLRoute {...ROUTES.ADDTESTIMONIAL} />
                    <ACLRoute {...ROUTES.EDITTESTIMONIAL} />
                    <ACLRoute {...ROUTES.RIDEWITHUS} />
                    <ACLRoute {...ROUTES.REFUNDREPORTING} />
                    <ACLRoute {...ROUTES.MERCHANTFINANCEREPORTING} />
                    <ACLRoute {...ROUTES.ADMINPASSWORD} />
                    <ACLRoute {...ROUTES.PAYOUTREQUESTS} />
                    <ACLRoute {...ROUTES.MANAGEPLAN} />
                    <ACLRoute {...ROUTES.ADDPLAN} />
                    <ACLRoute {...ROUTES.EDITPLAN} />
                    <ACLRoute {...ROUTES.MANAGETAXES} />
                    <ACLRoute {...ROUTES.ADDTAXES} />
                    <ACLRoute {...ROUTES.EDITTAXES} />
                    <ACLRoute {...ROUTES.MANAGEUSERSTATUS} />
                    <ACLRoute {...ROUTES.ADDNEWPROMOCODE} />
                    <ACLRoute {...ROUTES.NEWPROMOCODE} />
                    <ACLRoute {...ROUTES.NEWPROMOCODEDETAIL} />
                    <ACLRoute {...ROUTES.EDITNEWPROMOCODE} />
                    <ACLRoute {...ROUTES.COUPONSREQUEST}/>
                    <ACLRoute {...ROUTES.MANAGEPROMOTION}/>
                    <ACLRoute {...ROUTES.ADDNEWPROMOTIONSETTING}/>
                    <ACLRoute {...ROUTES.EDITNEWPROMOTIONSETTING}/>
                    <ACLRoute {...ROUTES.PROMOTIONSETTING}/>
                    <ACLRoute {...ROUTES.ADDPROMOTIONCATEGORY}/>
                    <ACLRoute {...ROUTES.EDITPROMOTIONCATEGORY}/>
                    <ACLRoute {...ROUTES.ENROLLMENTLISTING}/>
                    <ACLRoute {...ROUTES.DEALSREQUESTLISTING}/>
                    <ACLRoute {...ROUTES.BROADCASTINGREQUEST}/>
                    <ACLRoute {...ROUTES.DEALSCREATE}/>
                    <ACLRoute {...ROUTES.DEALSADD}/>
                    <ACLRoute {...ROUTES.DEALSVIEW}/>
                    <ACLRoute {...ROUTES.CREATEADSPROMOTION}/>
                    <ACLRoute {...ROUTES.PROMOTIONREPORTING}/>
                    
                    
                  </Suspense>
                </div>
              </div>

              


              <ToastContainer />
            </div>
          </div>
        <RenderRemoteComponent />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderListingSocket: (payload) => {
      dispatch(updateOrderListingSocket(payload));
    },
    updateRiderStatusSocket: (payload) => {
      dispatch(updateRiderStatusSocket(payload));
    }
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);
