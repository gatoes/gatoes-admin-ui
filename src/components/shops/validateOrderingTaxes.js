 const validateOrderingTaxes = values => {
  	const errors = {};
 	const timingArrayErrors = []
  	console.log('values', values);
  	
  	if (values.tax){
	  	values.tax.forEach((time, timeIndex) => {
		  	const timeErrors = {}
			if (!time || !time.tax_name) {
			    timeErrors.tax_name = 'Required'
			    timingArrayErrors[timeIndex] = timeErrors
			} else if (!time || !time.tax_amount || isNaN(time.tax_amount) || time.tax_amount <=0) {
			    timeErrors.tax_amount = 'Valid amount required'
			    timingArrayErrors[timeIndex] = timeErrors
			}

		  	if (timingArrayErrors.length) {
		      	errors.tax = timingArrayErrors
		  	}
	  	})
	}
  	return errors;
}

export default validateOrderingTaxes;