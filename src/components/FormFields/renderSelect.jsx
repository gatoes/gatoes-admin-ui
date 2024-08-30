import React, { Component, PropTypes } from 'react';
const renderSelectOptions = (obj, index, fieldSet) => (
    <option data-t = {fieldSet.value} key={obj[fieldSet.id]} value={obj[fieldSet.id]}>{obj[fieldSet.value]}</option>
  );
const renderSelect = ({ input, id, notes, parentDivClass, selectDataObject, dont_show_select_option, fieldSet, fieldClass, type, label, meta: { touched, error, invalid, warning } }) => (

  <div className={`${parentDivClass ? parentDivClass : 'form-group form-group-default'} ${touched && error ? ' has-error ':''}`} >
    {type != "hidden" && (<label>{label}</label>)}
  <div className="controls custom-select">
    <select {...input} id  = {id} className={ ` ${fieldClass ? fieldClass:' form-control  '} ${touched && error ? ' error ':''}` }>
      {!dont_show_select_option && <option value="-1">Select</option>}
      {
        selectDataObject.map((obj, index) => (
          <option  key={obj[fieldSet.id]} value={obj[fieldSet.id]}>{obj[fieldSet.value]}</option>
        ))
      }
    </select>
    {touched && ((error && <label className="error">{error}</label>) || (warning && <label className="error">{warning}</label>))}
  </div>
  {
    notes && (<div className="help-notes"><small>{notes}</small></div>)
  }
  </div>

)
export default renderSelect;
