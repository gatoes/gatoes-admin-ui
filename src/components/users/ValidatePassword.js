const ValidatePassword = values => {
  const errors = {};
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
  } else if (!values.confirm_password || values.confirm_password.trim() === '') {
    errors.confirm_password = 'Enter confirm password';
  } else if(values.password !== values.confirm_password){
  	errors.password = 'Passwords did not match';
  }

  return errors;
}
export default ValidatePassword;