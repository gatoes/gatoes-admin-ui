const ValidateZoneServiceRadius = values => {
 
  console.log('values', values);

  const errors = {};
  if (!values.radius || values.radius <= 0) {
    errors.radius = 'Enter valid radius';
  }
  
  return errors;
}
export default ValidateZoneServiceRadius;