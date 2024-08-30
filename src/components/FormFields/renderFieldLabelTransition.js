import React, { Component, PropTypes } from 'react';


const renderFieldLabelTransition = ({ input, id, readOnly, initialValue, notes, parentDivClass, fieldClass, label, type, placeholder,props, meta: {initial, touched, error, invalid, warning } }) => {
  console.log('rrrrrr', input);
return(

  <div className={`${parentDivClass ? parentDivClass : 'custom-form-control onclick'} ${touched && error ? ' has-error ':''}`} >

    <input {...input}  readOnly={readOnly} className={ ` ${fieldClass ? fieldClass:' text-field-custom  '} ${touched && error ? ' error  ':''} ` } type={type} id = {id?id:''}/>

    {type != "hidden" && (<label className="title-control">{label}</label>)}
    {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
    {
      /*type && type=="password" && (<a href="javascript:void" className="show-password-option" toggle="#password-field"><ion-icon name="md-eye-off" className="eye-icon"></ion-icon></a>)*/
    }

    {
    	notes && (<div className="help-notes"><small>{notes}</small></div>)
    }

</div>
)
}

export default renderFieldLabelTransition;
