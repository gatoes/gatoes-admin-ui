const ValidateStaff = values => {
  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter name';
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
  }
  if (!values.contactNumber || values.contactNumber.trim() === '') {
    errors.contactNumber = 'Enter contact number';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
  }

  return errors;
}
export default ValidateStaff;