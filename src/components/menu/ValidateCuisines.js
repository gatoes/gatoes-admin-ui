const ValidateCuisines = values => {

  const errors = {};
  if (!values.cuisinesName || values.cuisinesName.trim() === '') {
    errors.cuisinesName = 'Cuisine name is required';
  }
  
  return errors;
}
export default ValidateCuisines;