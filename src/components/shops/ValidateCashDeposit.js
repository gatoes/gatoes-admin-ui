const ValidateCashDeposit = values => {
  const errors = {};
  const re = /^[0-9]+([,.][0-9]+)?$/g;

  if (!values.amount || values.amount === '') {
    errors.amount = 'Enter amount';
  } else if(!re.test(values.amount)){
    errors.amount = 'Enter valid amount'; 
  }

  if (!values.referenceNumber || values.referenceNumber.trim() == '') {
    errors.referenceNumber = 'Enter reference number';
  }

  return errors;
}
export default ValidateCashDeposit;

