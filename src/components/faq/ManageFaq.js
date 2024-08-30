import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faqListing, faqListingSuccess } from '../../actions/users';
import FaqSlide from './FaqSlide';
import {getAclChecks} from '../../utilities';

class ManageFaq extends Component {
  constructor(props){
    super(props);
    this.state = {
      faqList: props.faqList,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
  }

  componentDidMount(){
    faqListing().then((response) => {
      this.props.faqListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'faqlist'){
      this.setState({
        faqList: nextProps.faqList,
        status: nextProps.status
      });
    }
  }

  render() {
    const {faqList, lang} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">FAQ</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('FAQ_ADD_EDIT') && lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/addfaq">Add</Link>
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
                        <th>Question</th>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        faqList && faqList.length > 0 && faqList.map((obj, index) => (
                          <FaqSlide slideData={obj} index={index} key={obj.id} />
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
    faqList: [...state.User.faq_list],
    status: state.User.status,
    compName: state.User.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    faqListingSuccess: (payload) => {
      dispatch(faqListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageFaq);