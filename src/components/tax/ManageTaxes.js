import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { taxListing, taxListingSuccess } from '../../actions/taxes';
import ManageTaxesSlide from './ManageTaxesSlide';
import {getAclChecks} from '../../utilities';

class ManageTaxes extends Component {
  constructor(props){
    super(props);
    this.state = {
      taxList: props.taxList,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
    this.reload = this.reload.bind(this);
  }

  componentDidMount(){
    this.fetchRecords();
  }

  reload(){
    this.fetchRecords();
  }

  fetchRecords(){
    taxListing().then((response) => {
      this.props.taxListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'taxlist'){
      this.setState({
        taxList: nextProps.taxList,
        status: nextProps.status
      });
    }
  }

  render() {
    const {taxList, lang} = this.state;

    console.log('taxList', taxList);
    
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Tax listing</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('SHOP_CATEGORY_ADD_EDIT') && lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/add-taxes"><span className="icon-ic_plus"></span>Add New</Link>
                  :
                  null
                }
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
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      {
                        taxList && taxList.rows && taxList.rows.length > 0 && taxList.rows.map((obj, index) => (
                          <ManageTaxesSlide slideData={obj} index={index} key={obj.id} reload={this.reload} />
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

const mapStatesToProps = (state, ownProps) => {
  return {
    taxList: state.Taxes.tax_list,
    status: state.Taxes.status,
    compName: state.Taxes.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    taxListingSuccess: (payload) => {
      dispatch(taxListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageTaxes);

