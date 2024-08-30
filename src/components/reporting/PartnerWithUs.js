import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRestaurantPatner } from '../../actions/shops';
import PartnerWithUsSlide from './PartnerWithUsSlide';
import Pagination from "react-js-pagination";

class PartnerWithUs extends Component {
  constructor(props){
    super(props);
    this.state = {
      records: {},
      activePage: 1
    };
    
    this.handlePageChange = this.handlePageChange.bind(this);
    
  }
 
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    getRestaurantPatner({pageNumber}).then((response) => {
      this.setState({
        records : response.data.data
      });
    })
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber);
  }

  render() {
    const {records, activePage} = this.state;
    var limit = 10;
    var total = 0;
    if(records && records.limit){
      var srno = (activePage-1) * records.limit;
      limit = records.limit;
      total = records.total;
    } else {
      var srno = 0;   
      limit = 10;
      total = 0
    }

    console.log('records', records);

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Partner with us</h4>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Restaurant Name</th>
                        <th>Owner Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        records && records.data && records.data.length > 0 && records.data.map((obj, index) => (
                          <PartnerWithUsSlide slideData={obj} index={index} key={obj._id} srno={srno} />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total ? total : 0}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
                  
          </div>
        </div>
      </div>
    );
  }
}

export default PartnerWithUs;