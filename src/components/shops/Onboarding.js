import React, { Component } from 'react';
import OnboardingSlide from './OnboardingSlide';
import { shopListing } from '../../actions/shops';
import Pagination from "react-js-pagination";
import OnboardingFilter from './OnboardingFilter';

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onboardingListing: {
        onboardings: [],
        limit: 0,
        total: 0,
      },
      activePage: 1,
      filters: { status: 3 },
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.fetchRecords(this.state.activePage, this.state.filters);
  }

  fetchRecords = async (pageNumber = 1, filters = {}) => {
    console.log(`Fetching records for page: ${pageNumber} with filters:`, filters);
    this.setState({ isLoading: true, error: null });

    try {
      const response = await shopListing({
        pageNumber, // Using 'pageNumber' as per your requirement
        ...filters,
      });

      console.log("API Response:", response);

      const { shop, total,limit } = response.data.data;

      if (!Array.isArray(shop)) {
        throw new Error("Invalid data format: 'shop' should be an array.");
      }

      this.setState({
        onboardingListing: {
          onboardings: shop,
          limit: limit, // Fixed limit
          total: total,
        },
        activePage: pageNumber,
        isLoading: false,
      });

      console.log(`Fetched ${shop.length} onboardings for page ${pageNumber}. Total: ${total}`);
    } catch (error) {
      console.error("Error fetching records:", error);
      this.setState({ isLoading: false, error: 'Failed to fetch records.' });
    }
  }

  handleFilterChange = (filters) => {
    console.log("Filter changed to:", filters);
    this.setState({ filters });
    this.fetchRecords(1, filters); // Reset to first page on filter change
  }

  handlePageChange = (pageNumber) => {
    console.log(`Page changed to: ${pageNumber}`);
    this.setState({
      activePage: pageNumber
    })
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const { onboardingListing, activePage, isLoading, error } = this.state;
    const { onboardings, limit, total } = onboardingListing;
    console.log("total check",limit,total)

    const srnoStart = (activePage - 1) * limit;

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Onboarding Listing</h4>
              </div>
            </div>

            <OnboardingFilter getFilterFields={this.handleFilterChange} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                      <div className="table-responsive">
                        <table>
                          <thead>
                            <tr>
                              <th>Sr. no.</th>
                              <th>Unique Id</th>
                              <th className="manage-content">Restaurant Name</th>
                              <th>Owner Name</th>
                              <th>Email</th>
                              <th>Contact</th>
                              <th>Zone</th>
                              <th>Activation Date</th>
                              <th>Completion Date</th>
                              {/* <th>Status</th> */}
                              <th>View</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {onboardings.length > 0 && (
                              onboardings.map((obj, index) => (
                                <OnboardingSlide
                                  key={obj.uniqueId}
                                  index={index}
                                  srno={srnoStart + index + 1}
                                  slideData={obj}
                                  fetchRecords={this.fetchRecords}
                                />
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>

                      
                        <div className="pagination">
                          <Pagination
                            activePage={activePage}
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

export default Onboarding;
