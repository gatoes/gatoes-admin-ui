import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
//import renderSelect from '../FormFields/renderSelect';
import {OPENING_CLOSING_TIME, OPENING_TIME} from "../../constants";
import { cityList, cityListSuccess, stateList, addNewRegion } from '../../actions/regions';
import {toast} from 'react-toastify';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './validateRegion';
import AsyncSelect from 'react-select/lib/Async';
import GooglePlacesAutocomplete from '../common/GooglePlacesAutocomplete';

class AddRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status,
      stateId: 0,
      latitude: 25.283943,
      longitude: 51.3719102
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleInputStateChange = this.handleInputStateChange.bind(this);
    this.updateFormattedAddress = this.updateFormattedAddress.bind(this);
    this.updateLatLng = this.updateLatLng.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.bindSlider = this.bindSlider.bind(this);
  }

  handleInputChange(inputCityValue){
    this.props.change('city', inputCityValue.value);
    this.props.change('city_chk', inputCityValue.value);
  }

  // handleInputStateChange(inputStateValue){
  //   this.props.change('state', inputStateValue.value);
  //   this.setState({
  //     stateId: inputStateValue.value
  //   })
  //   this.props.change('state_chk', inputStateValue.value);
  // }

  updateFormattedAddress(address){
    this.props.change('mapAddress', address);
    this.props.change('mapAddress_chk', address);
  }

  updateLatLng(latlng){
    this.props.change('latitude', latlng.lat);
    this.props.change('longitude', latlng.lng);
    this.setState({
      latitude: latlng.lat,
      longitude: latlng.lng
    });
  }

  loadOptions(inputValue, callback){
    if(inputValue == ''){
      callback([]);
      return;
    }

    cityList({filter: inputValue}).then((response) => {
        callback(response.data.data);
    });
  }


  // loadStateOptions(inputValue, callback){
    
  //   if(inputValue == ''){
  //     callback([]);
  //     return;
  //   }
  //   stateList({filter: inputValue}).then((response) => {
  //       callback(response.data.data);
  //   });
  // }

  componentDidMount(){
    window.addEventListener('load', () => {
      this.bindSlider();
    });

    if(document.readyState === "complete" || document.readyState === "interactive"){
      this.bindSlider();
    }
  }

  bindSlider(){
    var drawingManager;
    var selectedShape;
    var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
    var selectedColor;
    var colorButtons = {};
    var posstr;
    var pathstr, bndstr, cntstr, cntrstr, radstr, firstpathstr;
    let google = window.google;
    let reqlat = this.state.latitude ? this.state.latitude : 30.726523100000005;
    let reqlng = this.state.longitude ? this.state.longitude : 76.7588581;
    let patharray = [];

    const clearSelection = () => {
      if (selectedShape) {
        if (typeof selectedShape.setEditable == 'function') {
          selectedShape.setEditable(false);
        }
        selectedShape = null;
      }
      //curseldiv.innerHTML = "<b>cursel</b>:";
    }
    const updateCurSelText = (shape) => {

      posstr = "" + selectedShape.position;
      if (typeof selectedShape.position == 'object') {
        posstr = selectedShape.position.toUrlValue();
      }
      pathstr = "" + selectedShape.getPath;
      if (typeof selectedShape.getPath == 'function') {
        for (var i = 0; i < selectedShape.getPath().getLength(); i++) {
          patharray.push(selectedShape.getPath().getAt(i).toUrlValue().split(','))
        }
          patharray.push(selectedShape.getPath().getAt(0).toUrlValue().split(','))

        // pathstr = "[ ";
        // for (var i = 0; i < selectedShape.getPath().getLength(); i++) {
        //   // .toUrlValue(5) limits number of decimals, default is 6 but can do more
        //   if(i == 0){
        //     firstpathstr = selectedShape.getPath().getAt(i).toUrlValue();
        //   }
        //   pathstr += selectedShape.getPath().getAt(i).toUrlValue() + " , ";
        // }
        // pathstr += firstpathstr;
        // pathstr += "]";
      }
      bndstr = "" + selectedShape.getBounds;
      cntstr = "" + selectedShape.getBounds;
      if (typeof selectedShape.getBounds == 'function') {
        var tmpbounds = selectedShape.getBounds();
        cntstr = "" + tmpbounds.getCenter().toUrlValue();
        bndstr = "[NE: " + tmpbounds.getNorthEast().toUrlValue() + " SW: " + tmpbounds.getSouthWest().toUrlValue() + "]";
      }
      cntrstr = "" + selectedShape.getCenter;
      if (typeof selectedShape.getCenter == 'function') {
        cntrstr = "" + selectedShape.getCenter().toUrlValue();
      }
      radstr = "" + selectedShape.getRadius;
      if (typeof selectedShape.getRadius == 'function') {
        radstr = "" + selectedShape.getRadius();
      }

      // pathstr = pathstr.split(pathstr,' , ');
      this.props.change('regionCoordinates', patharray);

      //curseldiv.innerHTML = "<b>cursel</b>: " + selectedShape.type + " " + selectedShape + "; <i>pos</i>: " + posstr + " ; <i>path</i>: " + pathstr + " ; <i>bounds</i>: " + bndstr + " ; <i>Cb</i>: " + cntstr + " ; <i>radius</i>: " + radstr + " ; <i>Cr</i>: " + cntrstr ;
    }
    const setSelection = (shape, isNotMarker) => {
      clearSelection();
      selectedShape = shape;
      if (isNotMarker)
        shape.setEditable(true);
      selectColor(shape.get('fillColor') || shape.get('strokeColor'));

      updateCurSelText(shape);
    }
    const deleteSelectedShape = () => {
      if (selectedShape) {
        selectedShape.setMap(null);
        //console.log('delete');
        patharray = [];
        this.props.change('regionCoordinates', []);
      }
    }
    const selectColor = (color) => {
      selectedColor = color;
      for (var i = 0; i < colors.length; ++i) {
        var currColor = colors[i];
        //colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
      }
      // Retrieves the current options from the drawing manager and replaces the
      // stroke or fill color as appropriate.
      var polylineOptions = drawingManager.get('polylineOptions');

      polylineOptions.strokeColor = color;
      drawingManager.set('polylineOptions', polylineOptions);
      var rectangleOptions = drawingManager.get('rectangleOptions');
      rectangleOptions.fillColor = color;
      drawingManager.set('rectangleOptions', rectangleOptions);
      var circleOptions = drawingManager.get('circleOptions');
      circleOptions.fillColor = color;
      drawingManager.set('circleOptions', circleOptions);
      var polygonOptions = drawingManager.get('polygonOptions');
      polygonOptions.fillColor = color;
      drawingManager.set('polygonOptions', polygonOptions);

    }
    const setSelectedShapeColor = (color) => {
      if (selectedShape) {
        if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
          selectedShape.set('strokeColor', color);
          //console.log('9999');
        } else {
          selectedShape.set('fillColor', color);
          //console.log('77777');
        }
      }
    }
    const makeColorButton = (color) => {
      var button = document.createElement('span');
      button.className = 'color-button';
      button.style.backgroundColor = color;
      google.maps.event.addDomListener(button, 'click', function() {
        selectColor(color);
        setSelectedShapeColor(color);
      });
      return button;
    }
    const buildColorPalette = () => {
       var colorPalette = document.getElementById('color-palette');
       for (var i = 0; i < colors.length; ++i) {
         var currColor = colors[i];
         var colorButton = makeColorButton(currColor);
         colorPalette.appendChild(colorButton);
         colorButtons[currColor] = colorButton;
       }
       selectColor(colors[0]);
    }
    
    var map; //= new google.maps.Map(document.getElementById('map'), {
    // these must have global refs too!:
    var placeMarkers = [];
    var input;
    var searchBox;
    var curposdiv;
    var curseldiv;
    const deletePlacesSearchResults = () => {
      for (var i = 0, marker; marker = placeMarkers[i]; i++) {
        marker.setMap(null);
      }
      placeMarkers = [];
      input.value = ''; 
    }

    window.$$('#business-detail-modal').on('shown.bs.modal', function(){
      initialize();
    });
    
    const initialize = () => {
      map = new google.maps.Map(document.getElementById('map'), { 
        zoom: 10,
        center: new google.maps.LatLng(reqlat,reqlng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        zoomControl: true
      });
      //curposdiv = document.getElementById('curpos');
      //curseldiv = document.getElementById('cursel');
      var polyOptions = {
        strokeWeight: 0,
        fillOpacity: 0.45,
        editable: true
      };
      // Creates a drawing manager attached to the map that allows the user to draw
      // markers, lines, and shapes.
      drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        markerOptions: {
          draggable: true,
          editable: true,
        },
        polylineOptions: {
          editable: true
        },
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['polygon']
        },
        rectangleOptions: polyOptions,
        circleOptions: polyOptions,
        polygonOptions: polyOptions,
        map: map
      });

      google.maps.event.addListener(drawingManager, 'overlaycomplete', (e) => {
          var isNotMarker = (e.type != google.maps.drawing.OverlayType.MARKER);
          drawingManager.setDrawingMode(null);
          var newShape = e.overlay;

          newShape.type = e.type;
          google.maps.event.addListener(newShape, 'click', function() {
            setSelection(newShape, isNotMarker);
          });
          google.maps.event.addListener(newShape, 'drag', function() {
            updateCurSelText(newShape);
          });
          google.maps.event.addListener(newShape, 'dragend', function() {
            updateCurSelText(newShape);
          });
          setSelection(newShape, isNotMarker);

          setTimeout(() => {
            if(!newShape.editable){
              patharray = [];
              this.props.change('regionCoordinates', []);
            }
          }, 1);
      });
      // Clear the current selection when the drawing mode is changed, or when the
      // map is clicked.
      google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
      google.maps.event.addListener(map, 'click', clearSelection);
      google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);
      //buildColorPalette();
      
      // Create the search box and link it to the UI element.
       input = /** @type {HTMLInputElement} */( //var
          document.getElementById('pac-input'));

      //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
      //
      var DelPlcButDiv = document.createElement('div');
      DelPlcButDiv.style.backgroundColor = '#fff';
      DelPlcButDiv.style.cursor = 'pointer';
      DelPlcButDiv.innerHTML = 'DEL';
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(DelPlcButDiv);
      google.maps.event.addDomListener(DelPlcButDiv, 'click', deletePlacesSearchResults);
      searchBox = new google.maps.places.SearchBox( //var
        /** @type {HTMLInputElement} */(input));
      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
      google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        for (var i = 0, marker; marker = placeMarkers[i]; i++) {
          marker.setMap(null);
        }
        // For each place, get the icon, place name, and location.
        placeMarkers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });
          placeMarkers.push(marker);
          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      });
      // Bias the SearchBox results towards places that are within the bounds of the
      // current map's viewport.
      google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
        //curposdiv.innerHTML = "<b>curpos</b> Z: " + map.getZoom() + " C: " + map.getCenter().toUrlValue();
      });
    }
    initialize()
    // google.maps.event.addDomListener(window, 'load', initialize);
  }


  submitMenuForm(values){
    console.log('form', values);
    return addNewRegion(values)
    .then((result,error) => {
      toast.success('Zone added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/regionlisting');
      console.log('propss',this.props);

    }).catch((error,e) => {
      //console.log('error',error.response.data.error);
      throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const {cityList, stateId} = this.state;
    //console.log('cityList', this.state.stateId);
    return (
      <div className="container ani-ui-block ani-ui-block-fullwidth">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add New Zone</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                
                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Basic Details</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="name"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Name"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="maxCashLimit"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Cash limit for order"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="row zone-ui">
                        {/*
                        <div className="col-lg-12 selectbox-block">
                          <label>State</label>
                          <AsyncSelect
                            loadOptions={this.loadStateOptions}
                            defaultOptions
                            onChange={this.handleInputStateChange}
                            name='state'
                            parentDivClass="form-group w-100"
                            className="select-ui"
                          />
                          <Field name="state_chk" component={renderField} type="hidden" />
                        </div>
                        */}
                        <div className="col-lg-12 selectbox-block">
                          <label>City</label>
                          <AsyncSelect
                            loadOptions={this.loadOptions}
                            defaultOptions
                            onChange={this.handleInputChange}
                            name='City'
                            parentDivClass="form-group w-100"
                            className="select-ui"
                          />
                          <Field name="city_chk" component={renderField} type="hidden" />
                        </div>
                      
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>City Map Address</label>
                            <div className="textfield-block">
                              <GooglePlacesAutocomplete
                                updateFormattedAddress={this.updateFormattedAddress}
                                updateLatLng={this.updateLatLng}
                                placeholder="map address"
                                address={this.state.dropOffLocation}
                              />
                               <Field name="mapAddress_chk" component={renderField} type="hidden" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Service start time"
                            name="serviceOpeningTime"
                            optionLabel='label'
                            optionValue='value'
                            options={OPENING_TIME}
                            component={renderReactSelect}
                            placeholder="Opening Time"
                            multi={false}
                            parentDivClass="form-group w-100"
                            className="select-ui"
                          />
                        </div>
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Service end time"
                            name="serviceClosingTime"
                            optionLabel='label'
                            optionValue='value'
                            options={OPENING_CLOSING_TIME}
                            component={renderReactSelect}
                            placeholder="Closing Time"
                            multi={false}
                            parentDivClass="form-group w-100"
                            className="select-ui"
                          />
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-12">
                          <div id="panel">
                            <div id="color-palette"></div>
                            <div>
                              <a href="javascript:void(0)" id="delete-button">Delete Selected Shape</a>
                            </div>

                            <div id="curpos" style={{ display: 'none' }}></div>
                            <div id="cursel" style={{ display: 'none' }}></div>
                          
                          </div>
                          <input id="pac-input" type="text" placeholder="Search Zone" name="mapAddress" />
                          <div id="map" style={{ width: '900px', height: '300px' }}>A</div>
                          <Field name="regionCoordinates" component={renderField} type="hidden" />
                        </div>
                      </div>



                    </div>
                  </div>
                </div>
                
                <div className="row save-button-block">
                  <div className="col-sm-12 align-self-center">
                    <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    
                  </div>
                </div>
                  
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddRegion = reduxForm({
  form: 'AddRegionValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddRegion)

export default AddRegion;
