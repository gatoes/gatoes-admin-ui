import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoryListing, categoryListingSuccess } from '../../actions/shops';
import ManageShopCategorySlide from './ManageShopCategorySlide';
import {getAclChecks} from '../../utilities';

class ManageShopCategory extends Component {
  constructor(props){
    super(props);
    this.state = {
      catListing: props.catListing,
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
    categoryListing().then((response) => {
      this.props.categoryListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'catlist'){
      this.setState({
        catListing: nextProps.catListing,
        status: nextProps.status
      });
    }
  }

  render() {
    const {catListing, lang} = this.state;

    console.log('catListing', catListing);
    
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Category List</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('SHOP_CATEGORY_ADD_EDIT') && lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/addshopcategory"><span className="icon-ic_plus"></span>Add New</Link>
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      {
                        catListing && catListing.category && catListing.category.length > 0 && catListing.category.map((obj, index) => (
                          <ManageShopCategorySlide slideData={obj} index={index} key={obj.id} reload={this.reload} />
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
    catListing: state.Shop.cat_list,
    status: state.Shop.status,
    compName: state.Shop.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoryListingSuccess: (payload) => {
      dispatch(categoryListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageShopCategory);

