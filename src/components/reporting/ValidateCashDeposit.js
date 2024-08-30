const ValidateCashDeposit = values => {
  const errors = {};
  const re = /^[0-9]+([,.][0-9]+)?$/g;

  if (!values.amount || values.amount === '') {
    errors.amount = 'Enter amount';
  } else if(!re.test(values.amount)){
    errors.amount = 'Enter valid amount'; 
  }

  return errors;
}
export default ValidateCashDeposit;

