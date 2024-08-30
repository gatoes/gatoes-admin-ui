const validateMenuCategory = values => {
  	const errors = {};
 	const timingArrayErrors = []
  	console.log('values', values);
  	//console.log('111', !values.timing && values.timing.length);

  	if (!values.categoryName || values.categoryName.trim() === '') {
    	errors.categoryName = 'Enter name of category';
  	} 
  	if (values.timing){
	  	values.timing.forEach((time, timeIndex) => {
		  	const timeErrors = {}
			if (!time || !time.category_label) {
			    timeErrors.category_label = 'Required'
			    timingArrayErrors[timeIndex] = timeErrors
			} else if (!time || !time.category_opening_time) {
			    timeErrors.category_opening_time = 'Required'
			    timingArrayErrors[timeIndex] = timeErrors
			} else if (!time || !time.category_closing_time) {
			    timeErrors.category_closing_time = 'Required'
			    timingArrayErrors[timeIndex] = timeErrors
			} else if(parseInt(time.category_opening_time) >= parseInt(time.category_closing_time)){
				timeErrors.category_opening_time = 'Opening time should be less than closing time'
			    timingArrayErrors[timeIndex] = timeErrors
			}

		  	if (timingArrayErrors.length) {
		      	errors.timing = timingArrayErrors
		  	}

	  	})
	}
  	return errors;
}

export default validateMenuCategory;