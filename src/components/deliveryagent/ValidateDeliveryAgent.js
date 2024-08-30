const ValidateDeliveryAgent = values => {
  const errors = {};

  console.log('values',values);

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter name';
  }
  if (!values.vehicleDetails || values.vehicleDetails.trim() === '') {
    errors.vehicleDetails = 'Enter vehicle details';
  }
  if (!values.phoneNumber || values.phoneNumber.trim() === '') {
    errors.phoneNumber = 'Enter phone number';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
  }

  if (!values.regionId || values.regionId.length < 1) {
    errors.regionId = 'Select atleast one region';
  }
  
  if (!values.account_number || values.account_number.trim() === '') {
    errors.account_number = 'Enter account number';
  }

  if (!values.employee_uid || values.employee_uid.trim() === '') {
    errors.employee_uid = 'Enter employee UID';
  }
  if (!values.qatar_id || values.qatar_id.trim() === '') {
    errors.qatar_id = 'Enter qatar id';
  }
  if (!values.iban || values.iban.trim() === '') {
    errors.iban = 'Enter IBAN';
  }
  if (!values.swift_code || values.swift_code.trim() === '') {
    errors.swift_code = 'Enter swift code';
  }
  
  if (!values.address || values.address.trim() === '') {
    errors.address = 'Enter address';
  }
  if (!values.bank_name || values.bank_name < 1) {
    errors.bank_name = 'Choose bank';
  }
  if (!values.account_number || values.account_number === '') {
    errors.account_number = 'Enter account number';
  }
  if (!values.contact_number || values.contact_number === '') {
    errors.contact_number = 'Enter contact number';
  }
  if (!values.contact_person || values.contact_person.trim() === '') {
    errors.contact_person = 'Enter contact person';
  }
  if (!values.driving_license_class || values.driving_license_class.trim() === '') {
    errors.driving_license_class = 'Enter driving license class';
  }
  if (!values.insurance_company || values.insurance_company.trim() === '') {
    errors.insurance_company = 'Enter insurance company';
  }
  if (!values.nric || values.nric.trim() === '') {
    errors.nric = 'Enter NRIC';
  }
  if (!values.plate_number || values.plate_number.trim() === '') {
    errors.plate_number = 'Enter plate number';
  }
  if (!values.relationship || values.relationship.trim() === '') {
    errors.relationship = 'Enter relationship';
  } 
  if (!values.vehicle_brand || values.vehicle_brand.trim() === '') {
    errors.vehicle_brand = 'Enter vehicle brand';
  } 
  if (!values.vehicle_model || values.vehicle_model === '') {
    errors.vehicle_model = 'Enter vehicle model';
  } 
  if (!values.vehicle_type || values.vehicle_type.trim() === '') {
    errors.vehicle_type = 'Enter vehicle type';
  } 
  if (!values.year_make || values.year_make === '') {
    errors.year_make = 'Enter year make';
  }
  if (!values.riderWorkShift || values.riderWorkShift === '') {
    errors.riderWorkShift = 'Choose rider shift';
  }  

  if (!values.rider_type || values.rider_type === '') {
    errors.rider_type = 'Choose rider type';
  } 


  return errors;
}
export default ValidateDeliveryAgent;