const ValidateForm = values => {
  const errors = {};
  const timingArrayErrors = []
  //console.log('aaaa', values);
  if (!values.subject || values.subject.trim() === '') {
    errors.subject = 'Enter subject';
  }
  if (!values.message || values.message.trim() === '') {
    errors.message = 'Enter message';
  } else if (!values.notificationType || values.notificationType < 0) {
    errors.notificationType = 'Choose notification type';
  } else if(values.notificationType == 2 && values.message.length > 160){
    errors.message = 'For SMS message should be in less than 160 characters';
  }


  if (!values.notificationUser || values.notificationUser < 0) {
    errors.notificationUser = 'Choose notification user';
  }

  if (values.upload_csv || values.upload_csv == true) {
    if (!values.csv_records || values.csv_records.length < 1) {
      errors.csv = 'Please upload a valid CSV first';
    }
  }

  // if (values.zone){
  //     values.zone.forEach((time, timeIndex) => {
  //       const timeErrors = {};
  //       if(!time || !time.zoneId) {
  //           timeErrors.zoneId = 'Required'
  //           timingArrayErrors[timeIndex] = timeErrors
  //       }

  //       if (timingArrayErrors.length) {
  //           errors.zone = timingArrayErrors
  //       }

  //     })
  // }



  return errors;
}

export default ValidateForm;