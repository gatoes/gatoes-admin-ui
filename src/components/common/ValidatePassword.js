const ValidatePassword = values => {
  const errors = {};
  
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
  } else if(values.password.length < 9){
    errors.password = 'Password length should be atleast 9 characters.';
  } else if (!values.confirm_password || values.confirm_password.trim() === '') {
    errors.confirm_password = 'Enter confirm password';
  } else if(values.password !== values.confirm_password){
    errors.password = 'Password do not match';
  }
  return errors;
}
export default ValidatePassword;