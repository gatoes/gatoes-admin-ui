import React, { Component } from 'react';
import RestaurantDetailsInfo from './RestauarntDetailsInfo';

class ShowRestaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: props.restaurantData, // Data passed in from parent component
    };
  }

  render() {
    const { restaurantData } = this.state;

    return (
      <div className="order-details-block-ui">
        {/* Reuse ShopInfo for restaurant details */}
       
        
        <RestaurantDetailsInfo restaurantData={restaurantData} />
      </div>
    );
  }
}

export default ShowRestaurantDetail;
