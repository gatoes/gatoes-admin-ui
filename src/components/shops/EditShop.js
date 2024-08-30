import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {toast} from 'react-toastify';
import EditBasicDetail from './EditBasicDetail';
import ManageOrderingTime from './ManageOrderingTime';
import ManageShopImage from './ManageShopImage';
import ManageShopBanner from './ManageShopBanner'
import ManageShopTaxes from './ManageShopTaxes';

class EditShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu : 'info',
      shop_id: this.props.match.params.index
    }
    this.setMenuStatus = this.setMenuStatus.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(e, activeMenu){
    e.preventDefault();
    console.log('activeMenu', activeMenu);
    if(this.state.shop_id){
      this.setState({
        activeMenu
      });
    }
  }

  setMenuStatus(requiredTab){
    console.log('requiredTab',requiredTab);
    this.setState({
      activeMenu: requiredTab
    });
  }

  

  render() {
    const {activeMenu} = this.state;
    console.log('activeMenu1', activeMenu);
    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Update Restaurant</h4>
          </div>
          <div className="od-menu col-sm-12">
            <ul>
              <li><a className={`${activeMenu == 'info' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'info')}>Restaurant Basic info</a>
              </li>
              <li><a className={`${activeMenu == 'timing' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'timing')}>Restaurant Timings</a>
              </li>
              <li><a className={`${activeMenu == 'taxes' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'taxes')}>Restaurant Taxes</a>
              </li>
              <li><a className={`${activeMenu == 'pics' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'pics')}>Restaurant Image</a>
              </li>
              <li><a className={`${activeMenu == 'banner' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'banner')}>Banner</a>
              </li>
            </ul>
          </div>
          
          {
            activeMenu == 'info'
            ?
            <EditBasicDetail  setMenuStatus={this.setMenuStatus} shopId={this.state.shop_id} />
            :
            activeMenu == 'timing'
            ?
            <ManageOrderingTime shopId={this.state.shop_id} setMenuStatus={this.setMenuStatus} />
            :
            activeMenu == 'taxes'
            ?
            <ManageShopTaxes shopId={this.state.shop_id} setMenuStatus={this.setMenuStatus} />
            :
            activeMenu == 'pics'
            ?
            <ManageShopImage shopId={this.state.shop_id} setMenuStatus={this.setMenuStatus} />
            :
            <ManageShopBanner shopId={this.state.shop_id} />
          }
        

        </div>
        
      </div>
    );
  }
}

export default EditShop;
