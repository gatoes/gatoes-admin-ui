import moment from 'moment';

const ValidateShopBanner = values => {
  const errors = {};
  if (!values.start_date || values.start_date === '') {
    errors.start_date = 'Enter start date';
  } else if (!values.end_date || values.end_date === '') {
    errors.end_date = 'Enter end date';
  } else if(!values.bannerImage || values.bannerImage === '') {
    errors.image_chk = 'Please upload banner image first';
  } else {
    const startDate = moment(values.start_date);
    const timeEnd = moment(values.end_date);
    const diff = timeEnd.diff(startDate);
    if(diff < 0){
      errors.start_date = 'Start date can not less than end date';
    }
  }

  

  return errors;
}
export default ValidateShopBanner;