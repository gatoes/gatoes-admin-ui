import React, { Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRiderGeolocation, getRiderGeolocationSuccess } from '../../actions/deliveryagent';
import DeliveryAgentMapFilter from './DeliveryAgentMapFilter';

class RiderGeoMapLocationSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    console.log('9', this.state.slideData);
    this.bindSlider = this.bindSlider.bind(this);
  }

  componentDidMount(){
    window.addEventListener('load', () => {
      this.bindSlider();
    });

    if(document.readyState === "complete" || document.readyState === "interactive"){
      this.bindSlider();
    }
  }

  componentWillReceiveProps(nextProps){
    //console.log('nextProps', nextProps);
    // if(this.props.status != nextProps.status && nextProps.compName == 'drivermaplist'){
      this.setState({
         slideData: nextProps.slideData,
          index: nextProps.index
      });
    // }
  }
  

  bindSlider(){
    var contentstring = [];
    var regionlocation = [];
    var markers = [];
    var iterator = 0;
    var areaiterator = 0;
    var map;
    var infowindow = [];
    var center = {lat: 23.224820, lng: 72.571362};
    //geocoder = new google.maps.Geocoder();
    
    console.log('9999', this.state.slideData);

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
        zoom: 4,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        center: center,
      });
      drop();
    }
    
    const GetValues = () => {
      //Get the Latitude and Longitude of a Point site : http://itouchmap.com/latlong.html
      contentstring[0] = "Ahmedabad, Gujarat, India";
      regionlocation[0] = '23.022505, 72.571362';
            
      contentstring[1] = "Gandhinagar, Gujarat, India";
      regionlocation[1] = "23.224820, 72.646377";
      
      contentstring[2] = "Andheri East, Mumbai, india";
      regionlocation[2] = "19.115491, 72.872695";
      
      contentstring[3] = "Pune, india";
      regionlocation[3] = "18.520430, 73.856744";
      
      contentstring[4] = "Chennai, india";
      regionlocation[4] = "13.082680, 80.270718";
      
      contentstring[5] = "Visakhapatnam, Andhra Pradesh, india";
      regionlocation[5] = "17.686816, 83.218482";
      
    }
         
    const drop = () => {
      for (var i = 0; i < contentstring.length; i++) {
        setTimeout(function() {
          addMarker();
        }, 800);
      }
    }

    const addMarker = () => {
      var address = contentstring[areaiterator];
      var icons = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
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
    console.log('slideData', this.state.slideData);
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="result-listing">
            <div id="map" style={{ width: '1040px', height: '700px' }}>A</div>
          </div>
        </div>
      </div>
        
    );
  }
}

export default RiderGeoMapLocationSlide;