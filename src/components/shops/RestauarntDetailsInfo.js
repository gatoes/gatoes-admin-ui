import moment from 'moment';
import React, { Component } from 'react';

class RestaurantDetailsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: props.restaurantData
    };
  }

  render() {
    const { restaurantData } = this.state;
    console.log("restaruen infor",restaurantData)

    return (
        <div className="order-info">
        <div className="order-heading-ui">
        <h4>Restaurant Info</h4>
      </div>
      {/* <div className="content-detail">
        <div className="order-full-info">
          <ul>
            <li>
              <label>Owner Name</label>
              <p>{restaurantData.ownerName}</p>
            </li>
            <li>
              <label>Activation Date</label>
              <p>{restaurantData.activationDate}</p>
            </li>
            <li>
              <label>Status</label>
              <p>{restaurantData.status}</p>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="content-detail">
  <div className="order-full-info">
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <label style={{ minWidth: '150px' }}>Owner Name</label>
        <p style={{ margin: 0, whiteSpace: 'nowrap' }}>{restaurantData.name}</p>
      </li>
      <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <label style={{ minWidth: '150px' }}>Activation Date</label>
        <p style={{ margin: 0, whiteSpace: 'nowrap' }}>{restaurantData.activation_date ? moment(restaurantData.activation_date).format('ll') : null}</p>
      </li>
      <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <label style={{ minWidth: '150px' }}>Status</label>
        <p style={{ margin: 0, whiteSpace: 'nowrap' }}>{restaurantData.status || "Pending"}</p>
      </li>
    </ul>
  </div>
</div>

      </div>
    );
  }
}

export default RestaurantDetailsInfo;
