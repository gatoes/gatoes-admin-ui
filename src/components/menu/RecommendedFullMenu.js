import React, { Component, Suspense } from 'react';
import {currencyFormat} from '../../constants';

export default class RecommendedFullMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuListing: props.menuItems
    };
  }

	render() {
    const {menuListing} = this.state;
    console.log('1111', this.state.menuListing);
    	return (
        <>
        <div className="row">
          <div className="col-sm-12">
            <div className="pl-ui-block">
              {
                menuListing && menuListing.menu && menuListing.menu.length > 0 &&
                menuListing.menu.map((obj, index) => (
                  <>
                	{
                    obj.vegItem.length > 0 || obj.nonVegItem.length > 0
                    ?
                    <div className="r-items-block" id={"list-item-"+index} key={obj.id}>
                      <label className="item-heading">{obj.category_name}</label>
                      <div className="list-block">
                        { obj.vegItem && obj.vegItem.length > 0 && 
                          <div className="v-item-block">
                            <h3>Veg</h3>
                            <table>
                              <tbody>
                                {
                                  obj.vegItem && obj.vegItem.length > 0 &&
                                  obj.vegItem.map((items, undex) => (
                                      <tr key={items.id}>
                                        <td>
                                          <div className="item-name">
                                            <div className="v-icon"></div>
                                            <p>{items.itemName}</p>
                                            <span className="price">{currencyFormat(items.price, 'INR')}</span>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="right-content">
                                            <div className="os-check-box">
                                              <input type="checkbox" id={"stock" + items.id} defaultValue={items.id} />
                                              <label htmlFor={"stock" + items.id}></label>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          </div>
                        }

                        { obj.nonVegItem && obj.nonVegItem.length > 0 && 
                          <div className="v-item-block">
                            <h3>Non Veg</h3>
                            <table>
                              <tbody>
                                {
                                  obj.nonVegItem && obj.nonVegItem.length > 0 &&
                                  obj.nonVegItem.map((items, undex) => (
                                      <tr key={items.id}>
                                        <td>
                                          <div className="item-name">
                                            <div className="nv-icon"></div>
                                            <p>{items.itemName}</p>
                                            <span className="price">{currencyFormat(items.price, 'INR')}</span>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="right-content">
                                            <div className="os-check-box">
                                              <input type="checkbox" id={"stock" + items.id} defaultValue={items.id} />
                                              <label htmlFor={"stock" + items.id}></label>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          </div>
                        }

                      </div>
                    </div>
                    :
                    ''
                  }
                  </>
                ))
              }
            </div>
          </div>
        </div>
        </>
    	);
  	}
}