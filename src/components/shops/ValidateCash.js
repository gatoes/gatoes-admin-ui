const ValidateCash = values => {
  const errors = {};
  const re = /^[0-9]+([,.][0-9]+)?$/g;

  if (!values.newAmount || values.newAmount === '') {
    errors.newAmount = 'Enter amount';
  } else if(!re.test(values.newAmount)){
    errors.newAmount = 'Enter valid amount'; 
  }

  return errors;
}
export default ValidateCash;

