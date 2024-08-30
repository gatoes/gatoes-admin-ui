const ValidateNewPromoCode = values => {
  const errors = {};
  // console.log('aaaa', values);
  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter rule name first';
  }
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter rule description first';
  }
  if (!values.coupon || values.coupon < '') {
    errors.coupon = 'Choose coupon type first';
  } 
  if (!values.status || values.status < '') {
    errors.status = 'Choose status first';
  }

  if (!values.discount || values.discount.trim() === '') {
    errors.discount = 'Enter discount';
  }
  if (!values.discount_type || values.discount_type < '') {
    errors.discount_type = 'Choose discount type first';
  } 
  if(!values.start_time && !values.end_time){
    errors.start_time = "Please select start time"
    errors.end_time = "Please select end time"
  }

  if (values.start_time && values.end_time && (parseInt(values.start_time) > parseInt(values.end_time))) {
    errors.start_time = 'Start time can not be greater than end time';
  }

  if (!values.max_discount || values.max_discount <= 0) {
    errors.max_discount = 'Enter max discount';
  } else if (!values.minimum_subtotal || values.minimum_subtotal <= 0) {
    errors.minimum_subtotal = 'Enter minimum subtotal';
  }
  
  if (!values.coupon_quantity || values.coupon_quantity <= 0) {
    errors.coupon_quantity = 'Enter coupon quantity';
  }
  
   if (!values.uses_per_customer || values.uses_per_customer === '') {
    errors.uses_per_customer = 'Enter uses per customer';
  }
   if (!values.uses_per_coupon || values.uses_per_coupon === '') {
    errors.uses_per_coupon = 'Enter uses per coupon';
  }

  if ((values.coupon== 4) && !values.image) {
    errors.promocodeImage = 'Please upload coupon image';
  } 
  // if (!values.conditionpromo || !values.conditionpromo.length) {
  //   errors.conditionpromo = 'Select at least one condition';
  // }else{
  //     values.conditionpromo.forEach((condition, index) => {
  //       console.log(condition,index,"condition")
  //       if (!condition || !condition[index].zone) {
  //         errors[`conditionpromo[${index}].zone`] = 'Select zone';
  //       }
  //       // Check if restcategory is not selected
  //       if (!condition || !condition.restcategory || !condition.restcategory.length) {
  //         errors[`conditionpromo[${index}].restcategory`] = 'Select at least one restaurant category';
  //       }
  //     });
  // }

  // if (values.conditionpromo) {
  //   values.conditionpromo.forEach((condition, index) => {
  //     if (!condition || !condition.zone) {
  //       if (!errors.conditionpromo) {
  //         errors.conditionpromo = [];
  //       }
  //       if (!errors.conditionpromo[index]) {
  //         errors.conditionpromo[index] = {};
  //       }
  //       errors.conditionpromo[index].zone = 'Please Select zone';
  //     }
  //     if (!condition || !condition.restcategory || !condition.restcategory.length) {
  //       if (!errors.conditionpromo) {
  //         errors.conditionpromo = [];
  //       }
  //       if (!errors.conditionpromo[index]) {
  //         errors.conditionpromo[index] = {};
  //       }
  //       errors.conditionpromo[index].restcategory = 'Select at least one restaurant category';
  //     }
  //   });
  // }
 

  // working right
  // if (values.conditionpromo) {
  //   values.conditionpromo.forEach((condition, index) => {
  //     if (!condition || !condition.zone) {
  //       if (!errors.conditionpromo) {
  //         errors.conditionpromo = [];
  //       }
  //       if (!errors.conditionpromo[index]) {
  //         errors.conditionpromo[index] = {};
  //       }
  //       errors.conditionpromo[index].zone = 'Select zone';
  //       // errors.global = 'Please select at least one option';
  //     }
  //     if (!condition || !condition.restcategory || !condition.restcategory.length) {
  //       if (!errors.conditionpromo) {
  //         errors.conditionpromo = [];
  //       }
  //       if (!errors.conditionpromo[index]) {
  //         errors.conditionpromo[index] = {};
  //       }
  //       errors.conditionpromo[index].restcategory = 'Select at least one restaurant category';
  //     }
  //     if (condition && condition.restcategory) {
  //       if (!errors.conditionpromo) {
  //         errors.conditionpromo = [];
  //       }
  //       if (!errors.conditionpromo[index]) {
  //         errors.conditionpromo[index] = {};
  //       }
  //       condition.restcategory.forEach((cat, catIndex) => {
  //         if (!cat || !cat.category || cat.category.length === 0) {
  //           if (!errors.conditionpromo[index].restcategory) {
  //             errors.conditionpromo[index].restcategory = [];
  //           }
  //           errors.conditionpromo[index].restcategory[catIndex] = {
  //             category: 'Select at least one category',
  //           };
  //         }
  //         if (!cat || !cat.restaurant || cat.restaurant.length === 0) {
  //           if (!errors.conditionpromo[index].restcategory) {
  //             errors.conditionpromo[index].restcategory = [];
  //           }
  //           if (!errors.conditionpromo[index].restcategory[catIndex]) {
  //             errors.conditionpromo[index].restcategory[catIndex] = {};
  //           }
  //           errors.conditionpromo[index].restcategory[catIndex].restaurant = 'Select at least one restaurant';
  //         }
  //       });
  //     }

     
  //   });
  // }
  
  // if (values.conditionpromo) {
  //   values.conditionpromo.forEach((condition, index) => {
  //     if (!condition || (!condition.zone && condition.restcategory)) {
  //       if (!errors.conditionpromo) {
  //         errors.conditionpromo = [];
  //       }
  //       if (condition && condition.restcategory) {
  //         if (!errors.conditionpromo) {
  //           errors.conditionpromo = [];
  //         }
  //         if (!errors.conditionpromo[index]) {
  //           errors.conditionpromo[index] = {};
  //         }
  //         condition.restcategory.forEach((cat, catIndex) => {
  //           // if (!cat || !cat.category || cat.category.length === 0) {
  //           //   if (!errors.conditionpromo[index].restcategory) {
  //           //     errors.conditionpromo[index].restcategory = [];
  //           //   }
  //           //   // errors.conditionpromo[index].restcategory[catIndex] = {
  //           //     errors.global = 'Select at least one category'
  //           //   // };
  //           // }
  //           if (!cat || !cat.restaurant || cat.restaurant.length === 0) {
  //             if (!errors.conditionpromo[index].restcategory) {
  //               errors.conditionpromo[index].restcategory = [];
  //             }
  //             if (!errors.conditionpromo[index].restcategory[catIndex]) {
  //               errors.conditionpromo[index].restcategory[catIndex] = {};
  //             }
  //             errors.conditionpromo[index].restcategory[catIndex].restaurant = 
  //               errors.global = 'Please select at least one option'
              
  //           }
  //         });
  //       }
  //       errors.conditionpromo[index] = 
  //         errors.global = 'Please select at least one option'
  //       ;
  //     }
  //   });
  // }
  
  // let hasValidCondition = false;
  // if (values.conditionpromo) {
  //   values.conditionpromo.forEach((condition, index) => {
  //     if (!condition) {
  //       return;
  //     }

  //     // Initialize errors.conditionpromo and errors.conditionpromo[index] if they are undefined
  //     if (!errors.conditionpromo) {
  //       errors.conditionpromo = [];
  //     }
  //     if (!errors.conditionpromo[index]) {
  //       errors.conditionpromo[index] = {};
  //     }

  //     if (!condition.zone && (!condition.restcategory || condition.restcategory.length === 0)) {
  //       // errors.conditionpromo[index].zone = 'Select zone';
  //       // errors.conditionpromo[index].restcategory = 'Select at least one restaurant category';
  //       errors.global = 'Please select at least one option';
  //     } else if (condition.restcategory && condition.restcategory.length > 0) {
  //       condition.restcategory.forEach((cat, catIndex) => {
  //         if (!cat || !cat.restaurant || cat.restaurant.length === 0) {
  //           if (!errors.conditionpromo[index].restcategory) {
  //             errors.conditionpromo[index].restcategory = [];
  //           }
  //           if (!errors.conditionpromo[index].restcategory[catIndex]) {
  //             errors.conditionpromo[index].restcategory[catIndex] = {};
  //           }
  //           // errors.conditionpromo[index].restcategory[catIndex].restaurant = 'Select at least one restaurant';
  //           errors.global = 'Please select at least one option';
  //         } else {
  //           hasValidCondition = true;
  //         }
  //       });
  //     } else {
  //       hasValidCondition = true;
  //     }
  //   });

  //   if (!hasValidCondition) {
  //     errors.global = 'Please select at least one option';
  //   }
  // }

  // final working validation which is correct
  // let hasValidCondition = false;
  // if (values.conditionpromo) {
  //   values.conditionpromo.forEach((condition, index) => {
  //     if (!condition) {
  //       return;
  //     }

  //     // Initialize errors.conditionpromo and errors.conditionpromo[index] if they are undefined
  //     if (!errors.conditionpromo) {
  //       errors.conditionpromo = [];
  //     }
  //     if (!errors.conditionpromo[index]) {
  //       errors.conditionpromo[index] = {};
  //     }

  //     let hasZoneOrRestaurantOrCategory = false;

  //     if (condition.zone) {
  //       hasZoneOrRestaurantOrCategory = true;
  //     }

  //     if (condition.restcategory && condition.restcategory.length > 0) {
  //       condition.restcategory.forEach((cat, catIndex) => {
  //         if (cat && cat.restaurant && cat.restaurant.length > 0) {
  //           hasZoneOrRestaurantOrCategory = true;
  //         } else {
  //           if (!errors.conditionpromo[index].restcategory) {
  //             errors.conditionpromo[index].restcategory = [];
  //           }
  //           if (!errors.conditionpromo[index].restcategory[catIndex]) {
  //             errors.conditionpromo[index].restcategory[catIndex] = {};
  //           }
  //           // errors.conditionpromo[index].restcategory[catIndex].restaurant = 'Select at least one restaurant';
  //         }
  //       });
  //     }

  //     if (!hasZoneOrRestaurantOrCategory) {
  //       // errors.conditionpromo[index].zone = 'Select zone or restaurant category';
  //       errors.global = 'Please select at least one option';
  //     } else {
  //       hasValidCondition = true;
  //     }
  //   });

  //   if (!hasValidCondition) {
  //     errors.global = 'Please select at least one option';
  //   }
  // }

  return errors;
}

export default ValidateNewPromoCode;