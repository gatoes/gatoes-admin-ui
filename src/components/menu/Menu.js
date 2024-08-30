import React, { Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {authentication} from '../../utilities';
import {ROUTES} from '../../routes';
import RenderRemoteComponent from '../../RenderRemoteComponent';
import MenuCategory from './MenuCategory';
import MenuCategoryItem from './MenuCategoryItem';
import {menuListing, menuListingSuccess, getShopCategoryCsv} from '../../actions/menus';
import { Link } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
import {getAclChecks} from '../../utilities';
import {deleteMenuMultipleItems} from '../../actions/menus';
import { DELETE_CONFIRMATION, DELETE_SUCCESS} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuList: props.menuList,
      status: props.status,
      totalItems:0,
      shopName: null,
      shopId: props.match.params.shopid,
      startDownload: null,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
    this.updateCategoryState = this.updateCategoryState.bind(this);
    this.deleteAllItem = this.deleteAllItem.bind(this);
  }

  updateCategoryState(response){
    this.setState({
      menuList : response
    });
  }

  componentDidMount(){
    menuListing({shopId : this.state.shopId}).then((response) => {
      this.props.menuListingSuccess(response.data.data.menu);
      this.setState({
        totalItems: response.data.data.total,
        shopName: response.data.data.shopName,
        shopId: response.data.data.shopId
      });
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'menuFullList'){
      this.setState({
        menuList: nextProps.menuList,
        totalItems: nextProps.totalItems,
        shopName: nextProps.shopName,
        status: nextProps.status
      });
    }
  }

  downloadCatCsv(){
    getShopCategoryCsv({shopId: this.state.shopId, type : 0}).then((response) => {  
      this.setState({
        startDownload: response
      });
    });
  }

  downloadItemCsv(){
    getShopCategoryCsv({shopId: this.state.shopId, type : 1}).then((response) => {  
      this.setState({
        startDownload: response
      });
    });
  }

  deleteAllItem(shopId){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteMenuMultipleItems({shopId: shopId}).then((response) => {
              toast.success(DELETE_SUCCESS, {
                position: toast.POSITION.TOP_RIGHT
              });
              window.location.reload();
              
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  render() {
    if(!authentication()){
        return <Redirect to='/login'/>
    }
    const {menuList, totalItems, shopName, shopId, startDownload, lang} = this.state;
    
    if(startDownload !== null){
      this.setState({
        startDownload: null
      });
      //console.log('startDownload', startDownload.data);
      return <CSVDownload data={startDownload.data} target="_parent" />
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="menu-btn-outer"><button className="menu-btn-ui"><img src="images/menu-icon.svg" alt=""/>Menu</button></div>
            <MenuCategory menuListing={this.state.menuList} shopId={this.state.shopId} updateCategoryState={this.updateCategoryState} />
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="right-ui-block">
              <div className="scrollspy-example">
                <div className="rm-content">
                  <div className="row menu-top-block">
                    <div className="col-sm-5 tl-block align-self-center">
                      <h4 className="heading">{shopName} Menu<span className="r-item-no">{totalItems}</span></h4>
                    </div>
                    <div className="col-sm-7 tr-block text-right align-self-center">
                      <Link to="/dashboard/requestedmenuitems"><button className="btn btn1">PENDING ITEMS</button></Link>
                      {
                        getAclChecks('SHOP_MENU_ADD_EDIT') && lang == 'en'
                        ?
                        <Link to={ "/dashboard/addmenuitem/" + shopId}><button className="btn green-btn"><i className="material-icons">add_circle_outline</i>ADD NEW ITEM</button></Link>
                        :
                        null
                      }
                    </div>
                  </div>

                  <div className="row menu-top-block">
                    <div className="col-sm-3 tl-block align-self-center">
                      <a href="javscript:void(0);" onClick={this.downloadItemCsv.bind(this)}><button className="btn btn1">Download Items CSV</button></a>
                    </div>
                    <div className="col-sm-3 tl-block align-self-center">
                      <a href="javscript:void(0);" onClick={this.downloadCatCsv.bind(this)}><button className="btn btn1">Download Category CSV</button></a>
                    </div>
                    
                    <div className="col-sm-3 tl-block align-self-center">
                      {
                        getAclChecks('SHOP_MENU_ADD_EDIT') && lang == 'en'
                        ?
                        <Link to={"/dashboard/uploaditemcsv/"+shopId}><button className="btn btn1">Upload CSV</button></Link>
                        :
                        null
                      }
                    </div>
                    {
                      getAclChecks('SHOP_MENU_DELETE')
                      ?
                      <div className="col-sm-3 tl-block align-self-center">
                        <a href="javascript:void(0)" onClick={() => this.deleteAllItem(this.state.shopId)}><button className="btn btn1">Delete All Items</button></a>
                      </div>
                      :
                      null
                    }
                  </div>


                  <MenuCategoryItem menuListing={this.state.menuList} shopId={this.state.shopId} updateCategoryState={this.updateCategoryState} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    auth: state.User.auth,
    menuList: [...state.Menu.menu_list],
    status: state.Menu.status,
    compName: state.Menu.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    menuListingSuccess: (payload) => {
      dispatch(menuListingSuccess(payload));
    },

  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Menu);