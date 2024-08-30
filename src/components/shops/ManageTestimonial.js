import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFeedback } from '../../actions/shops';
import ManageTestimonialSlide from './ManageTestimonialSlide';

class ManageTestimonial extends Component {
  constructor(props){
    super(props);
    this.state = {
      records: {}
    };
    this.reloadPanel = this.reloadPanel.bind(this);
  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  reloadPanel(){
    this.fetchRecords();
  }

  fetchRecords(){
    getFeedback().then((response) => {
      this.setState({
        records : response.data.data
      });
    })
  }

  render() {
    const {records} = this.state;
    

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Restaurant Testimonial</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <Link className="btn green-btn" to="/dashboard/addtestimonial"><span className="icon-ic_plus"></span>Add New</Link>
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        records && records.length > 0 && records.map((obj, index) => (
                          <ManageTestimonialSlide slideData={obj} index={index} key={obj.id} reloadPanel={this.reloadPanel} />
                        ))
                      }
                    </tbody>
                  </table>
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

export default ManageTestimonial;