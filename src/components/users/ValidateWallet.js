const ValidateWallet = values => {
  const errors = {};
  const re = /^[0-9]+([,.][0-9]+)?$/g;

  if (!values.reason || values.reason === '') {
    errors.reason = 'Enter reason';
  } 
  if (!values.amount || values.amount === '') {
    errors.amount = 'Enter amount';
  }

  if (!values.is_debit || values.is_debit < 0) {
    errors.is_debit = 'Select type';
  } else if(!re.test(values.amount)){
    errors.amount = 'Enter valid amount'; 
  } else if(values.is_debit == 1 && values.current_amount < values.amount){
     errors.amount = 'Debit amount should not be greater than user wallet amount.'; 
  }



  return errors;
}
export default ValidateWallet;

