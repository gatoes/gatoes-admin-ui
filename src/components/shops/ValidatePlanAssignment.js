const ValidatePlanAssignment = values => {
  const errors = {};
  
  if (!values.planId || values.planId < 1) {
    errors.planId = 'Choose plan';
  }
  

  return errors;
}
export default ValidatePlanAssignment;