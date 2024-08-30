const ValidateAppVersion = values => {
  const errors = {};
  if (!values.android_merchant_version || values.android_merchant_version == '') {
    errors.android_merchant_version = 'Enter android merchant version';
  }
  if (!values.ios_merchant_version || values.ios_merchant_version == '') {
    errors.ios_merchant_version = 'Enter IOS merchant version';
  }

  if (!values.android_rider_version || values.android_rider_version == '') {
    errors.android_rider_version = 'Enter android rider version';
  }
  if (!values.ios_rider_version || values.ios_rider_version == '') {
    errors.ios_rider_version = 'Enter IOS rider version';
  }

  if (!values.android_user_version || values.android_user_version == '') {
    errors.android_user_version = 'Enter android user version';
  }
  if (!values.ios_user_version || values.ios_user_version == '') {
    errors.ios_user_version = 'Enter IOS user version';
  }

  return errors;
}
export default ValidateAppVersion;