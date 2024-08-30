const ValidateRole = values => {
  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter role name';
  }


  return errors;
}
export default ValidateRole;