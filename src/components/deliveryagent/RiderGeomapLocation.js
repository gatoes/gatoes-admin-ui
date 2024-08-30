import React, { Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRiderGeolocation, getRiderGeolocationSuccess } from '../../actions/deliveryagent';
import DeliveryAgentMapFilter from './DeliveryAgentMapFilter';
import { RIDER_DEFAULT_LAT, RIDER_DEFAULT_LNG } from '../../constants';
//import RiderGeoMapLocationSlide from './RiderGeoMapLocationSlide';

class RiderGeomapLocation extends Component {
  constructor(props){
    super(props);
    this.state = {
      driverListing: {}, //props.driverListing,
      // status: props.status,
      activePage: 1,
      totalDrivers:0,
      filter: {},
      startDownload: null
    };
    this.bindSlider = this.bindSlider.bind(this);
    this.getFilterFields = this.getFilterFields.bind(this);
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(filters);
  }

  fetchRecords(filters){
    getRiderGeolocation({...filters}).then((response) => {
      this.setState({
        driverListing: response.data.data
      }, () =>{this.bindSlider();})

      // this.props.getRiderGeolocationSuccess(response.data.data);
    })
  }

  componentDidMount(){
    getRiderGeolocation().then((response) => {
      // this.props.getRiderGeolocationSuccess(response.data.data);
      this.setState({
        driverListing: response.data.data
      }, () =>  {
        window.addEventListener('load', () => {
          this.bindSlider();
        });

        if(document.readyState === "complete" || document.readyState === "interactive"){
          this.bindSlider();
        }
      })
    })

    
  }

  componentDidUpdate(){
     // window.addEventListener('load', () => {
     //    this.bindSlider();
     //  });

     //  if(document.readyState === "complete" || document.readyState === "interactive"){
     //    this.bindSlider();
     //  }
  }

  componentWillReceiveProps(nextProps){
    //console.log('nextProps', nextProps);
    // if(this.props.status != nextProps.status && nextProps.compName == 'drivermaplist'){
    //   this.setState({
    //     driverListing: nextProps.driverListing,
    //     status: nextProps.status
    //   });
    // }
  }

  bindSlider(){
    var contentstring = [];
    var regionlocation = [];
    var isOnline = [];
    var markers = [];
    var iterator = 0;
    var areaiterator = 0;
    var map;
    var infowindow = [];
    var center = {lat: this.state.driverListing.latitude ? this.state.driverListing.latitude : RIDER_DEFAULT_LAT, lng: this.state.driverListing.longitude ? this.state.driverListing.longitude : RIDER_DEFAULT_LNG};
    //geocoder = new google.maps.Geocoder();
    
    console.log('9999', this.state.driverListing);

    window.$$(document).ready(function () {
      setTimeout(function() { initialize(); }, 400);
    });
    
    const initialize = () => {           
      infowindow = [];
      markers = [];
      GetValues();
      iterator = 0;
      areaiterator = 0;
      //region = new google.maps.LatLng(regionlocation[areaiterator].split(',')[0], regionlocation[areaiterator].split(',')[1]);
      map = new window.google.maps.Map(document.getElementById("map"), { 
        zoom: 12,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        center: center,
      });
      drop();
    }
    
    const GetValues = () => {
      //Get the Latitude and Longitude of a Point site : http://itouchmap.com/latlong.html
      contentstring = this.state.driverListing && this.state.driverListing.contentstring;
      regionlocation = this.state.driverListing && this.state.driverListing.regionlocation;
      isOnline = this.state.driverListing && this.state.driverListing.isOnline;
            
      // contentstring[0] = "Gandhinagar, Gujarat, India";
      // regionlocation[0] = "23.224820, 72.646377";
      
    }
         
    const drop = () => {
      for (var i = 0; i < contentstring.length; i++) {
        setTimeout(function() {
          addMarker();
        }, 800);
      }
    }

    const addMarker = (onlineStatus) => {
      var address = contentstring[areaiterator];
      console.log(areaiterator, 'onlineStatus', address);
      if(isOnline[areaiterator]){ 
        var icons = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      } else {
        var icons = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';  
      }
      
      var templat = regionlocation[areaiterator].split(',')[0];
      var templong = regionlocation[areaiterator].split(',')[1];
      var temp_latLng = new window.google.maps.LatLng(templat, templong);
      markers.push(new window.google.maps.Marker(
      {
        position: temp_latLng,
        map: map,
        icon: icons,
        draggable: false
      }));            
      iterator++;
      info(iterator);
      areaiterator++;
    }

    const info = (i) => {
      infowindow[i] = new window.google.maps.InfoWindow({
        content: contentstring[i - 1]
      });
      infowindow[i].content = contentstring[i - 1];
      window.google.maps.event.addListener(markers[i - 1], 'click', function() {
        for (var j = 1; j < contentstring.length + 1; j++) {
          infowindow[j].close();
        }
        infowindow[i].open(map, markers[i - 1]);
      });
    }

  }

  render() {
    const {driverListing, status} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Rider View</h4>
              </div>
              {/* 
              <div className="col-sm-7 tr-block text-right align-self-center">
                <Link className="btn green-btn" to="/dashboard/ridergeomaplocation"><span className="icon-ic_plus"></span>Reload</Link>
              </div>
              */}
            </div>

            <DeliveryAgentMapFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <div id="map" style={{ width: '1040px', height: '700px' }}>A</div>
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
    driverListing: state.DeliveryAgent.driver_map_list,
    status: state.DeliveryAgent.status,
    compName: state.DeliveryAgent.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRiderGeolocationSuccess: (payload) => {
      dispatch(getRiderGeolocationSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(RiderGeomapLocation);