import React, { Component, PropTypes } from 'react';


const renderTextarea = ({ input, id, readOnly, initialValue, notes, parentDivClass, fieldClass, label, type, placeholder,props, meta: {initial, touched, error, invalid, warning } }) => {
  //console.log('rrrrrr', initial);
return(

  <div className={ `${"form-group"} ${parentDivClass ? parentDivClass : ' '} ${touched && error ? ' has-error ':''}`} >
    {type != "hidden" && (<label>{label}</label>)}
  <div className="textfield-block">
    <textarea {...input}   className={ ` ${fieldClass ? fieldClass:' textfield  '} ${touched && error ? ' error ':''}` } placeholder={placeholder?placeholder:label} />
    {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
    {
    	notes && (<div className="help-notes"><small>{notes}</small></div>)
    }
  </div>

</div>
)
}

export default renderTextarea;
