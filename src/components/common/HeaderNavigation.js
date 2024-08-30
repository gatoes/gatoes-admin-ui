import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';
import Clock from 'react-live-clock';
import { connect } from 'react-redux';
//import {getNotificationCounter, getNotification, setReadStatus} from '../../actions/notifications';
import {getNotificationCounter, setReadStatus} from '../../actions/notifications';
import {notifyLink} from '../../constants';

class HeaderNavigation extends Component {
    constructor(props){
        super(props);
        this.state = {
          noticeCounter: props.noticeCounter,
          noticeListing: []
        }
        this.bindSlider = this.bindSlider.bind(this);
        this.setReadStatus = this.setReadStatus.bind(this);
    }

    setReadStatus(id){
        window.$$('.notification-close').trigger('click');
        setReadStatus({id: id}).then((response) => {
          
        })
    }

    componentDidMount(){
        this.props.getNotificationCounter();
        window.addEventListener('load', this.bindSlider);
        if(document.readyState === "complete" || document.readyState === "interactive"){
            this.bindSlider();
        }
        this.fetchRecords(false);

    }

    fetchRecords(count){
        //console.log('aaa', count);
        if(count){
            this.setState({
                noticeCounter : 0
            })
        }
        // getNotification({setcount:count}).then((response) => {
        //   this.setState({
        //         noticeListing : response.data.data.notification
        //   })
        // })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.noticeCounter != nextProps.noticeCounter){
          this.setState({
            noticeCounter: nextProps.noticeCounter
          })
        }
    }

    bindSlider(){
        const $ = window.$$;
        $(".notification-nav .btn-dropdown").click(function(){
            $("body").addClass("blur");
            $(".notification-dropdown-block").addClass("active");
            $(".notification-dropdown-block").removeClass("hidden");
        });
        $(".notification-close").click(function(){
            $("body").removeClass("blur");
            $(".notification-dropdown-block").removeClass("active");
            $(".notification-dropdown-block").addClass("hidden");
        });
        $(".n-overlay").click(function(){
            $("body").removeClass("blur");
            $(".notification-dropdown-block").removeClass("active");
            $(".notification-dropdown-block").addClass("hidden");
        });
        
    }

    getNotificationList(){
        this.fetchRecords(true);
    }

    render() {
        const {noticeCounter, noticeListing} = this.state;
        //console.log('noticeListing', new Date().toString().split(' ')[5]);
        return (
            <div className="nav-right">
                <div className="block-alert time-ui-block">
                    <div className="time-text">
                        <Clock format={'hh:mma'} ticking={true} timezone={moment.tz.guess()} />
                        <span>(
                            { new Date().toString().split(' ')[5] ? new Date().toString().split(' ')[5] : '' }
                        )</span>
                    </div>
                    <span className="date-text"> {moment(new Date()).format('ddd, MMM DD')}</span>
                </div>
                <div className="block-alert notification-nav">
                    <a href="javascript:void(0);" className="btn-dropdown" onClick={this.getNotificationList.bind(this)} >
                        <i className="material-icons">notifications</i>
                        {
                            noticeCounter > 0
                            ?
                            <span className="counter-text">{noticeCounter}</span>
                            :
                            null
                        }
                        
                    </a>
                    <div className="notification-dropdown-block">
                        <a href="javascript:;" className="notification-close">×</a>
                        <div className="header-dropdown-ui">
                            <div className="tab-heading">
                               <ul className="nav nav-tabs">
                                  <li><a href="javascript:void(0)">Notifications</a></li>
                               </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane active" id="alert">
                                <div className="panel panel-default">
                                    <div id="collapseOne" className="panel-collapse collapse in">
                                        <div className="panel-body">
                                            <div className="n-list-view">
                                                <ul>
                                                    {
                                                        noticeListing && noticeListing.length > 0 && noticeListing.map((obj, index) => (
                                                            <li className={obj.isOpen == true ? 'package-list active' : 'package-list'} onClick={() => this.setReadStatus(obj._id)} key={obj._id}>
                                                                <Link to={notifyLink(obj.notificationType, obj.subjectId ? obj.subjectId : 0)}>
                                                                    <div className="n-detail">
                                                                        <h2>{obj.title}</h2>
                                                                        <time>{ moment(obj.createdAt).fromNow() }</time>
                                                                        <p>{obj.message}</p>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="block-alert account-nav">
                    <a href="javascript:void(0);" className="btn-dropdown dropdown-toggle" data-toggle="dropdown">
                        <i className="material-icons">person</i>
                        <span className="name">Your Account</span>
                    </a>
                    <div className="dropdown-menu">
                        <NavLink className="dropdown-item" to='/logout'>Logout</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    noticeCounter: state.Notification.notification_count,
    status: state.Notification.status,
    compName: state.Order.compName
  }
}

export default connect(mapStatesToProps, {getNotificationCounter})(HeaderNavigation);