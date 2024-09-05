import React, { Component } from 'react';
import OnboardingSlide from './OnboardingSlide';
import Pagination from "react-js-pagination";
import OnboardingFilter from './OnboardingFilter';

class Onboarding extends Component {
  constructor(props) {
    super(props);
    // Simulating data for frontend
    this.state = {
      onboardingListing: {
        onboardings: [
          {
            uniqueId: 'R001',
            restaurantName: 'Pizza Palace',
            ownerName: 'John Doe',
            email: 'john@pizzapalace.com',
            contact: '9876543210',
            zone: 'Zone 1',
            activationDate: '2023-07-20',
            completionDate: '2023-07-25',
            status: 'Pending',
          },
          {
            uniqueId: 'R002',
            restaurantName: 'Sushi World',
            ownerName: 'Jane Smith',
            email: 'jane@sushiworld.com',
            contact: '8765432109',
            zone: 'Zone 2',
            activationDate: '2023-07-22',
            completionDate: '2023-08-28',
            status: 'Completed',
          },
        ],
        limit: 10,
        total: 2
      },
      activePage: 1,
      filter: {}
    };
  }

  getFilterFields = (filters) => {
    this.setState({ filters });
    // You can apply filter logic here when backend is ready
  }

  handlePageChange = (activePage) => {
    this.setState({ activePage });
    // You can handle pagination logic here when backend is ready
  }

  render() {
    const { onboardingListing, activePage } = this.state;
    const srno = (activePage - 1) * onboardingListing.limit;

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Onboarding Listing</h4>
              </div>
            </div>

            <OnboardingFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Sr.no.</th>
                          <th>Unique Id</th>
                          <th className="manage-content">Restaurant Name</th>
                          <th>Owner Name</th>
                          <th>Email</th>
                          <th>Contact</th>
                          <th>Zone</th>
                          <th>Activation Date</th>
                          <th>Completion Date</th>
                          <th>Status</th>
                          <th>View</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          onboardingListing.onboardings && onboardingListing.onboardings.length > 0 &&
                          onboardingListing.onboardings.map((obj, index) => (
                            <OnboardingSlide
                              key={obj.uniqueId}
                              index={index}
                              srno={srno}
                              slideData={obj}
                            />
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={onboardingListing.limit}
                      totalItemsCount={onboardingListing.total}
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
