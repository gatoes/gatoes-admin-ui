import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateDeliveryRegion';
import { addBusinessZone, addBusinessZoneSuccess } from '../../actions/regions';
import Tooltip from '../common/Tooltip';

class AddBusinessZone extends Component {
  constructor(props){
    super(props);
    this.state = {
      regionDetail: props.regionDetail,
      geofence : []
    }
    this.bindSlider = this.bindSlider.bind(this);
    this.props.change('regionId', this.state.regionDetail.id ? this.state.regionDetail.id : 0);
  }

  componentDidMount(){
    window.addEventListener('load', () => {
      this.bindSlider();
    });

    if (window.google && window.google.maps) {
      this.bindSlider();
    }

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
    let reqlat = this.state.regionDetail.latitude ? this.state.regionDetail.latitude : 30.7333;
    let reqlng = this.state.regionDetail.longitude ? this.state.regionDetail.longitude : 76.7794;
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
        } else {
          selectedShape.set('fillColor', color);
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
        zoom: 12,
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

      google.maps.event.addListener(drawingManager, 'overlaycomplete', (e)=> {
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
          //console.log('777', newShape);
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
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  
  submitMenuForm(values){
    //console.log('form', values);
    return addBusinessZone(values)
    .then((result) => {
      this.props.addBusinessZoneSuccess(result.data.data);
      toast.success('Business zone added Successfully.');
      this.props.reset();
      this.props.updateBusinessZone(result);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
    
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
        <div className="form-block">
          <div className="row">
            <div className="col-lg-12">
              <Field
                name="name"
                component={renderField}
                type="text"
                className="form-control"
                label="Name"
                placeholder=""
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
              <input id="pac-input" type="text" placeholder="Search Box" />
              <div id="map" style={{ width: '700px', height: '300px' }}>A</div>
            </div>
          </div>
        </div>
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
    );
  }
}

AddBusinessZone = reduxForm({
  form: 'AddBusinessZoneValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddBusinessZone)

const mapDispatchToProps = (dispatch) => {
  return {
    addBusinessZoneSuccess: (payload) => {
      dispatch(addBusinessZoneSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddBusinessZone);