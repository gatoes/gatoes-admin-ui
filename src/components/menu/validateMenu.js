const validateMenu = values => {
  const errors = {};
  const variantArrayErrors = [];
  const addonArrayErrors = [];
  let isDefaultErrors = 0;
  //const semiAddonArrayErrors = [];
  //console.log('111',values);  


  if (!values.itemName || values.itemName.trim() === '') {
    errors.itemName = 'Enter name of item';
  }
  if (!values.categoryId || values.categoryId === 'undefined') {
    errors.categoryId = 'Select item category first';
  }  
  if (!values.tags || values.tags === 'undefined') {
    errors.tags = 'Please enter atleast one tag';
  }

  if (values.multipleVariant && values.multipleVariant == '0') {
    if (!values.itemPrice || values.itemPrice == '') {
      errors.itemPrice = 'Enter item pricing';
    }
  } else {
    if (!values.variantCategory || values.variantCategory.trim() === '') {
      errors.variantCategory = 'Enter name of variant category';
    }

    if (values.variants){
      values.variants.forEach((variation, variantIndex) => {

        const variantErrors = {}
        if (!variation || !variation.variantName) {
            variantErrors.variantName = 'Required'
            variantArrayErrors[variantIndex] = variantErrors
        }
        if (!variation || typeof variation.variantPrice == 'undefined') {
            variantErrors.variantPrice = 'Required'
            variantArrayErrors[variantIndex] = variantErrors
        }

        if (!variation || (variation.isDefault == "1" && variation.status == 0)) {
            variantErrors.variantName = 'A default variant can not be disable';
            variantArrayErrors[variantIndex] = variantErrors
        }

        if (!variation || !variation.isDefault) {
            
        } else {
          isDefaultErrors = 1;
        }
        if (variantArrayErrors.length) {
            errors.variants = variantArrayErrors
        }

      })
    }
    // if (isDefaultErrors == 0) {
    //   errors.variantCategory = 'Please choose atlease one variant as default';
    // }
  }

  if (values.isAddon && values.isAddon == 1) {
    if(values.fulladdons){
      values.fulladdons.forEach((addon, addonIndex) => {
        const addonErrors = {}
        if(!addon || !addon.category_name){
          addonErrors.category_name = 'Required'
          addonArrayErrors[addonIndex] = addonErrors
        }
        if(!addon || !addon.minRange){
          addonErrors.minRange = 'Required'
          addonArrayErrors[addonIndex] = addonErrors
        }
        if(!addon || !addon.maxRange){
          addonErrors.maxRange = 'Required'
          addonArrayErrors[addonIndex] = addonErrors
        } if(addon.minRange > addon.maxRange){
          addonErrors.minRange = 'Min range can not be greater than max range';
          addonArrayErrors[addonIndex] = addonErrors
        } else {
          if(addon.semiaddons){
            if(addon.maxRange > addon.semiaddons.length){
              addonErrors.maxRange = 'Max value should not be greater than total options'
              addonArrayErrors[addonIndex] = addonErrors
            }
          }
        }

        //semi addons
        if(addon.semiaddons){
          //console.log('length', addon.semiaddons.length);
          addon.semiaddons.forEach((semiaddon, semiIndex)=> {
            const semiAddonErrors = {}
            if(!semiaddon || !semiaddon.name){
              semiAddonErrors.name = 'Required'
              if(typeof addonArrayErrors[addonIndex] === 'undefined'){
                addonArrayErrors[addonIndex] = {semiaddons: []};
              }else if(typeof addonArrayErrors[addonIndex].semiaddons === 'undefined'){
                addonArrayErrors[addonIndex] = {...addonArrayErrors[addonIndex], semiaddons: []};
              }
              addonArrayErrors[addonIndex].semiaddons[semiIndex] = semiAddonErrors
            }

            if(!semiaddon || typeof semiaddon.price == 'undefined'){
              semiAddonErrors.price = 'Required'
              if(typeof addonArrayErrors[addonIndex] === 'undefined'){
                addonArrayErrors[addonIndex] = {semiaddons: []};
              }else if(typeof addonArrayErrors[addonIndex].semiaddons === 'undefined'){
                addonArrayErrors[addonIndex] = {...addonArrayErrors[addonIndex], semiaddons: []};
              }
              addonArrayErrors[addonIndex].semiaddons[semiIndex] = semiAddonErrors
            }

            if(!semiaddon || semiaddon.type === undefined){
              semiAddonErrors.type = 'Required'
              if(typeof addonArrayErrors[addonIndex] === 'undefined'){
                addonArrayErrors[addonIndex] = {semiaddons: []};
              }else if(typeof addonArrayErrors[addonIndex].semiaddons === 'undefined'){
                addonArrayErrors[addonIndex] = {...addonArrayErrors[addonIndex], semiaddons: []};
              }
              addonArrayErrors[addonIndex].semiaddons[semiIndex] = semiAddonErrors
            }


          })
        }


        if(addonArrayErrors.length){
          errors.fulladdons = addonArrayErrors;
        }


      })
    }
  }

  console.log('111111', errors);


  return errors;
}

export default validateMenu;