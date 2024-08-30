const ValidatePlan = values => {

  console.log('sdfsdfsdfsfsdf', values);

  const errors = {};
  let isDefaultErrors = 0;
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter plan name';
  }
  if (!values.code || values.code.trim() === '') {
    errors.code = 'Enter code';
  }
  if (isNaN(values.restaurant_visibility_range) || (values.restaurant_visibility_range == '') || values.restaurant_visibility_range < 0) {
    errors.restaurant_visibility_range = 'Enter valid restaurant visibility range';
  }
  if (isNaN(values.platform_on_boarding_fee) || values.platform_on_boarding_fee == '' || values.platform_on_boarding_fee < 0) {
    errors.platform_on_boarding_fee = 'Enter valid platform on boarding fee';
  }
  if (isNaN(values.minimum_order) || (values.minimum_order == '') || values.minimum_order < 0) {
    errors.minimum_order = 'Enter valid minimum order';
  }
  if (isNaN(values.menu_updation_charges) || (values.menu_updation_charges == '') || values.menu_updation_charges < 0) {
    errors.menu_updation_charges = 'Enter valid menu updation charges';
  }
  if (isNaN(values.monthly_payout_request_limit) || (values.monthly_payout_request_limit == '') || values.monthly_payout_request_limit < 0) {
    errors.monthly_payout_request_limit = 'Choose valid monthly payout request limit';
  }
  if (isNaN(values.merchant_delivery_charges) || (values.merchant_delivery_charges == '') || values.merchant_delivery_charges < 0) {
    errors.merchant_delivery_charges = 'Choose valid merchant delivery charges';
  }

  if (isNaN(values.merchant_multiplier_beyond_normal_delivery_radius) || (values.merchant_multiplier_beyond_normal_delivery_radius == '') || values.merchant_multiplier_beyond_normal_delivery_radius < 0) {
    errors.merchant_multiplier_beyond_normal_delivery_radius = 'Enter merchant multiplier beyond normal delivery radius';
  }

  // if (!values.merchant_multiplier_beyond_normal_delivery_radius || values.merchant_multiplier_beyond_normal_delivery_radius < 0) {
  //   errors.merchant_multiplier_beyond_normal_delivery_radius = 'Enter merchant multiplier beyond normal delivery radius';
  // }
  if (isNaN(values.merchant_surge) || parseInt(values.merchant_surge) < 0) {
    errors.merchant_surge = 'Enter valid merchant surge';
  }
  if (isNaN(values.merchant_base_price) || (values.merchant_base_price == '') || values.merchant_base_price < 0) {
    errors.merchant_base_price = 'Enter valid merchant base price';
  }
  if (isNaN(values.merchant_base_percentage) || (values.merchant_base_percentage == '') || values.merchant_base_percentage < 0) {
    errors.merchant_base_percentage = 'Enter valid merchant base percentage';
  }
  if (isNaN(values.merchant_cap_percentage) || (values.merchant_cap_percentage == '') || values.merchant_cap_percentage < 0) {
    errors.merchant_cap_percentage = 'Enter valid merchant cap percentage';
  }
  if (isNaN(values.commission) || (values.commission == '') || values.commission < 0) {
    errors.commission = 'Enter valid commission';
  }
  if (isNaN(values.merchant_max_cap_percentage) || (values.merchant_max_cap_percentage == '') || values.merchant_max_cap_percentage < 0) {
    errors.merchant_max_cap_percentage = 'Enter valid max cap for merchant';
  }
  if (isNaN(values.merchant_normal_delivery_radius) || (values.merchant_normal_delivery_radius == '') || values.merchant_normal_delivery_radius < 0) {
    errors.merchant_normal_delivery_radius = 'Enter valid merchant normal delivery radius';
  }
  if (!values.merchant_support || values.merchant_support < 0) {
    errors.merchant_support = 'Choose merchant support type';
  }

  if (isNaN(values.order_base_price) || (values.order_base_price == '') || values.order_base_price < 0) {
    errors.order_base_price = 'Enter valid order base price';
  }
  if (isNaN(values.user_platform_base_divisor) || (values.user_platform_base_divisor == '') || values.user_platform_base_divisor < 0) {
    errors.user_platform_base_divisor = 'Enter valid platform base divisor';
  }
  if (!values.user_delivery_charges || values.user_delivery_charges < 0) {
    errors.user_delivery_charges = 'Enter user delivery charges';
  }

  if (!values.user_delivery_charges_beyond_normal_delivery_radius || values.user_delivery_charges_beyond_normal_delivery_radius < 0) {
    errors.user_delivery_charges_beyond_normal_delivery_radius = 'Enter valid user delivery charges beyond normal delivery radius';
  }
  if (isNaN(values.base_order_price_for_normal_delivery_radius) || (values.base_order_price_for_normal_delivery_radius == '') || values.base_order_price_for_normal_delivery_radius < 0) {
    errors.base_order_price_for_normal_delivery_radius = 'Enter valid base order price for normal delivery radius';
  }
  if (isNaN(values.user_normal_delivery_radius) || (values.user_normal_delivery_radius == '') || values.user_normal_delivery_radius < 0) {
    errors.user_normal_delivery_radius = 'Enter valid user normal delivery radius';
  }
  if (isNaN(values.user_low_order_fee) || (values.user_low_order_fee == '') || values.user_low_order_fee < 0) {
    errors.user_low_order_fee = 'Enter valid user low order fee';
  }
  if (isNaN(values.user_platform_base) || (values.user_platform_base == '') || values.user_platform_base < 0) {
    errors.user_platform_base = 'Enter valid user platform base';
  }
  if (isNaN(values.user_surge) || (values.user_surge == '') || values.user_surge < 0) {
    errors.user_surge = 'Enter valid user surge';
  }


  if (!values.zone_ids || values.zone_ids.length == 0) {
    errors.zone_ids = 'Choose atleast one zone';
  }

  if (isNaN(values.user_platform_fee) || (values.user_platform_fee == '') || values.user_platform_fee < 0) {
    errors.user_platform_fee = 'Choose valid user platform fee';
  }


  const chargesArrayErrors = [];

  if (values.weekly_plan_charges){
    values.weekly_plan_charges.forEach((charges, chargesIndex) => {
      console.log('4444333', charges);
      const chargesErrors = {}
      if (!charges || !charges.order) {
        chargesErrors.order = 'Invalid value'
        chargesArrayErrors[chargesIndex] = chargesErrors
      }
      if (!charges || isNaN(charges.charges)  || charges.charges < 0) {
        chargesErrors.charges = 'Invalid value'
        chargesArrayErrors[chargesIndex] = chargesErrors
      }
      
      if (chargesArrayErrors.length) {
          errors.weekly_plan_charges = chargesArrayErrors
      }

    })
  }



  // if (isNaN(values.user_per_km_delivery_charges) || values.user_per_km_delivery_charges < 0) {
  //   errors.user_per_km_delivery_charges = 'Enter valid user per km delivery charges';
  // }

  
  // if (isNaN(values.merchantMultiplierBeyondFixedKmLimit) || values.merchantMultiplierBeyondFixedKmLimit < 0) {
  //   errors.merchantMultiplierBeyondFixedKmLimit = 'Enter valid merchant multiplier beyond fixed KM limit';
  // }
  // if (isNaN(values.userMultiplierBeyondFixedKmLimit) || values.userMultiplierBeyondFixedKmLimit < 0) {
  //   errors.userMultiplierBeyondFixedKmLimit = 'Enter valid user multiplier beyond fixed KM limit';
  // }
  // if (isNaN(values.userDeliveryChargesBeyondFixedKmLimit) || values.userDeliveryChargesBeyondFixedKmLimit < 0) {
  //   errors.userDeliveryChargesBeyondFixedKmLimit = 'Enter valid user delivery charges beyond fixed KM limit';
  // }
  // if (isNaN(values.userDeliveryChargesLowerBasePrice) || values.userDeliveryChargesLowerBasePrice < 0) {
  //   errors.userDeliveryChargesLowerBasePrice = 'Enter valid user delivery charges lower base price';
  // }
  // if (isNaN(values.merchant_per_km_delivery_charges) || values.merchant_per_km_delivery_charges < 0) {
  //   errors.merchant_per_km_delivery_charges = 'Enter valid merchant per KM delivery charges';
  // }
  // if (isNaN(values.fixed_delivery_charges_upto) || values.fixed_delivery_charges_upto < 0) {
  //   errors.fixed_delivery_charges_upto = 'Enter valid fixed delivery charges upto';
  // }
  // if (isNaN(values.user_surge) || values.user_surge < 0) {
  //   errors.user_surge = 'Enter valid user surge';
  // }

  

  






  
  
 

  // if (isNaN(values.delivery_range) || values.delivery_range < 0) {
  //   errors.delivery_range = 'Choose valid delivery range';
  // }

  

  // if (isNaN(values.user_platform_fee) || values.user_platform_fee < 0) {
  //   errors.user_platform_fee = 'Choose valid user platform fee';
  // }

  

  // if (!values.packagingChargePaidBy || values.packagingChargePaidBy < 0) {
  //   errors.packagingChargePaidBy = 'Choose who bear cost of packaging';
  // }

  
  // const chargesArrayErrors = [];

  // if (values.taxes){
  //   values.taxes.forEach((charges, chargesIndex) => {
  //     console.log('4444333', charges);
  //     const chargesErrors = {}
  //     if (!charges || !charges.taxName) {
  //       chargesErrors.taxName = 'Invalid value'
  //       chargesArrayErrors[chargesIndex] = chargesErrors
  //     }
  //     if (!charges || isNaN(charges.taxAmount)  || charges.merchant_delivery_charges < 0) {
  //       chargesErrors.taxAmount = 'Invalid value'
  //       chargesArrayErrors[chargesIndex] = chargesErrors
  //     }
      
  //     if (chargesArrayErrors.length) {
  //         errors.taxes = chargesArrayErrors
  //     }

  //   })
  // }


  // const chargesArrayErrors = [];

  // if (values.delivery_charges){
  //   values.delivery_charges.forEach((charges, chargesIndex) => {
  //     console.log('4444333', charges);
  //     const chargesErrors = {}
  //     if (!charges || !charges.range  || charges.range < 0) {
  //       chargesErrors.range = 'Invalid value'
  //       chargesArrayErrors[chargesIndex] = chargesErrors
  //     }
  //     if (!charges || !charges.merchant_delivery_charges  || charges.merchant_delivery_charges < 0) {
  //       chargesErrors.merchant_delivery_charges = 'Invalid value'
  //       chargesArrayErrors[chargesIndex] = chargesErrors
  //     }

  //     if (!charges || !charges.user_delivery_charges  || charges.user_delivery_charges < 0) {
  //       chargesErrors.user_delivery_charges = 'Invalid value'
  //       chargesArrayErrors[chargesIndex] = chargesErrors
  //     }

  //     if (!charges || !charges.isDefault) {
          
  //     } else {
  //       isDefaultErrors = 1;
  //     }
  //     if (chargesArrayErrors.length) {
  //         errors.delivery_charges = chargesArrayErrors
  //     }

  //   })
  // }

  console.log('4444888888', errors);
  

  return errors;
}
export default ValidatePlan;