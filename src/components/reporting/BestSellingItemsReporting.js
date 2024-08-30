import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItemReporting } from '../../actions/menus';
import BestSellingItemsReportingSlide from './BestSellingItemsReportingSlide';
import Pagination from "react-js-pagination";
import BestSellingItemFilter from './BestSellingItemFilter';
import { CSVLink, CSVDownload } from "react-csv";

class BestSellingItemsReporting extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemListing: props.itemListing,
      status: props.status,
      activePage: 1,
      startDownload: null
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    getItemReporting({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => {  
      this.setState({
        startDownload: response
      });
    });
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }
 
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    getItemReporting({pageNumber, ...filters}).then((response) => {
      this.setState({
        itemListing : response.data.data
      });
    })
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {itemListing, activePage, filters, startDownload} = this.state;
    var limit = 10;
    var total = 0;
    if(itemListing && itemListing.limit){
      var srno = (activePage-1) * itemListing.limit;
      limit = itemListing.limit;
      total = itemListing.total;
    } else {
      var srno = 0;   
      limit = 10;
      total = 0
    }

    console.log('itemListing', itemListing);

    if(startDownload !== null){
      this.setState({
        startDownload: null
      });
      console.log('startDownload', startDownload.data);
      return <CSVDownload data={startDownload.data} target="_parent" />
    }

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Best Selling Items</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <div className="download-block">
                    <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                </div>
              </div>
            </div>

            <BestSellingItemFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Item Name</th>
                        <th>Shop</th>
                        <th>Sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        itemListing && itemListing.items && itemListing.items.length > 0 && itemListing.items.map((obj, index) => (
                          <BestSellingItemsReportingSlide slideData={obj} index={index} key={obj.id} srno={srno} startDate={itemListing.startDate} endDate={itemListing.endDate} />
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

export default BestSellingItemsReporting;