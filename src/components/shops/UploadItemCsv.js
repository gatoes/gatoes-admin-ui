import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {toast} from 'react-toastify';
import ItemBasicDetail from './ItemBasicDetail';
import ItemVariant from './ItemVariant';
import ItemAddon from './ItemAddon';

class UploadItemCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu : 'info',
      shop_id: this.props.match.params.index
    }
  }

  toggle(e, activeMenu){
    e.preventDefault();
    if(this.state.shop_id){
      this.setState({
        activeMenu
      });
    }
  }

  render() {
    const {activeMenu} = this.state;
    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add Menu Item</h4>
          </div>
          <div className="od-menu col-sm-12">
            <ul>
              <li><a className={`${activeMenu == 'info' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'info')}>Item Basic info</a>
              </li>
              <li><a className={`${activeMenu == 'variant' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'variant')}>Multiple Variants</a>
              </li>
              <li><a className={`${activeMenu == 'addon' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'addon')}>Items Addons</a>
              </li>

            </ul>
          </div>

          
            {
              activeMenu == 'info'
              ?
              <ItemBasicDetail shopId={this.state.shop_id} />
              :
              activeMenu == 'variant'
              ?
              <ItemVariant shopId={this.state.shop_id} />
              :
              <ItemAddon shopId={this.state.shop_id} />
            }
          

        </div>
        
      </div>
    );
  }
}

export default UploadItemCsv;
