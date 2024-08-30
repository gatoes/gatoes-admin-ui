const ValidateSetting = values => {
  const errors = {};

  if (!values.user_view_distance_km || values.user_view_distance_km == '' || values.user_view_distance_km < 1 || isNaN(values.user_view_distance_km)) {
    errors.user_view_distance_km = 'Enter valid user view distance (min 1)';
  }
  if (!values.rider_request_acceptance_time || values.rider_request_acceptance_time == '' || values.rider_request_acceptance_time < 10 || isNaN(values.rider_request_acceptance_time)) {
    errors.rider_request_acceptance_time = 'Enter Rider request acceptance time (min 10)';
  }
  if (values.rider_request_acceptance_time && values.rider_request_acceptance_time > 60 || isNaN(values.rider_request_acceptance_time)) {
    errors.rider_request_acceptance_time = 'Time value must be less than 60 secs and valid';
  }
  if (!values.request_rider_time_before_prep || values.request_rider_time_before_prep == '' || values.request_rider_time_before_prep < 1 || isNaN(values.request_rider_time_before_prep)) {
    errors.request_rider_time_before_prep = 'Enter request time for rider before preparation';
  }
  if (!values.trip_minimum_order || values.trip_minimum_order == '' || isNaN(values.trip_minimum_order)) {
    errors.trip_minimum_order = 'Enter trip minimum order value';
  } else if(values.trip_minimum_order%1 != 0){
    errors.trip_minimum_order = 'Decimal value is not allowed';
  }
  if (!values.rider_request_timeout || values.rider_request_timeout == '' || values.rider_request_timeout < 5 || isNaN(values.rider_request_timeout)) {
    errors.rider_request_timeout = 'Enter valid rider order request timeout (min 5)';
  }
  if (!values.veg_visibility_status || values.veg_visibility_status < 0) {
    errors.veg_visibility_status = 'Choose you want to show or hide dietery';
  }
  if (!values.distance_unit || values.distance_unit < 0) {
    errors.distance_unit = 'Choose distance unit';
  }
  if (!values.distance_unit || values.distance_unit < 0) {
    errors.distance_unit = 'Choose distance unit';
  }

  if (!values.maxCashOrderLimit || values.maxCashOrderLimit < 0) {
    errors.maxCashOrderLimit = 'Enter max cash order limit';
  }
  if (!values.maxCashRiderCarry || values.maxCashRiderCarry < 0) {
    errors.maxCashRiderCarry = 'Enter max cash limit for rider';
  }
  
  if (!values.numberOfDays || values.numberOfDays < 0) {
    errors.numberOfDays = 'Enter Number of days';
  }
  if (!values.timeBetweenEndAndStart || values.timeBetweenEndAndStart < 0) {
    errors.timeBetweenEndAndStart = 'Enter Time slot difference';
  }
  if (!values.timeAfterNow || values.timeAfterNow < 0) {
    errors.timeAfterNow = 'Enter Time after now';
  }
  if (!values.schedule_order_time || values.schedule_order_time < 0) {
    errors.schedule_order_time = 'Enter schedule order time alert to merchant';
  }

  return errors;
}
export default ValidateSetting;