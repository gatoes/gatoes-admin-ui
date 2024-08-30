import React, { Component, PropTypes } from 'react';
const renderRadio = ({ input, id, initialValue, notes, parentDivClass, fieldClass, label, type, placeholder,props,disabled, meta: {initial, touched, error, invalid, warning, } }) => {
  console.log('disabled', disabled);
return(

  <div className={ `radio-active ${disabled && "radio_disable"} ${parentDivClass ? parentDivClass : ' '} ${touched && error ? ' has-error ':''}`} >
    
    <input {...input}  id = {id?id:''} className={ ` ${fieldClass ? fieldClass:'   '} ` } type='radio' disabled={disabled}/>
    <label htmlFor={id?id:''} dangerouslySetInnerHTML={{__html:label}}></label>
    {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}



</div>
)
}

export default renderRadio;
