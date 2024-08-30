const ValidatePayoutRequest = values => {
  const errors = {};
  const re = /^[0-9]+([,.][0-9]+)?$/g;

  	if(!values.status){
  		errors.status = 'Choose valid status'; 
  	}

  	if(values.status && values.status == 2){
  		if (!values.amount || values.amount === '') {
	    	errors.amount = 'Enter amount';
		} else if(!re.test(values.amount)){
	    	errors.amount = 'Enter valid amount'; 
	  	}

	  	if (!values.transactionId || values.transactionId === '') {
	    	errors.transactionId = 'Enter transaction id';
		}
  	}


  

  return errors;
}
export default ValidatePayoutRequest;

