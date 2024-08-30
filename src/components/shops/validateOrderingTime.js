 const validateOrderingTime = values => {
  	const errors = {};
 	const timingArrayErrors = []
  	console.log('values', values);
  	//console.log('111', !values.timing && values.timing.length);
  	var ftime = 0;
  	var ltime = 0;
  	var catlable = '';
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
			} else if(((parseInt(time.category_opening_time) > ftime && parseInt(time.category_opening_time) < ltime) || (parseInt(time.category_closing_time) > ftime && parseInt(time.category_closing_time) < ltime)) && catlable == time.category_label){
				timeErrors.category_opening_time = 'There is confliction in timing for this day, please check'
			    timingArrayErrors[timeIndex] = timeErrors
			}

		  	if (timingArrayErrors.length) {
		      	errors.timing = timingArrayErrors
		  	}

		  	ftime = parseInt(time.category_opening_time);
		  	ltime = parseInt(time.category_closing_time);
		  	catlable = time.category_label;

	  	})
	}
  	return errors;
}

export default validateOrderingTime;