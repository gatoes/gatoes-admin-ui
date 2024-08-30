const validateRegion = values => {
 
  console.log('values', values);

  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter name';
  }
  if (!values.city_chk || values.city_chk <= 0) {
    errors.city_chk = 'Choose city';
  }
  // if (!values.state_chk || values.state_chk <= 0) {
  //   errors.state_chk = 'Choose State';
  // }
  if (!values.mapAddress_chk || values.mapAddress_chk === '') {
    errors.mapAddress_chk = 'Enter city map address';
  }
  if (!values.regionCoordinates || values.regionCoordinates === '') {
    errors.regionCoordinates = 'Mark your geofence first';
  }
  if (!values.serviceOpeningTime || values.serviceOpeningTime < 0) {
    errors.serviceOpeningTime = 'Choose service start time';
  } else if (!values.serviceClosingTime || values.serviceClosingTime <= 0) {
    errors.serviceClosingTime = 'Choose service closing time';
  } else if(parseInt(values.serviceOpeningTime) > parseInt(values.serviceClosingTime)){
    errors.serviceOpeningTime = 'Service start time can not be greater than service end time';
  }
  return errors;
}
export default validateRegion;