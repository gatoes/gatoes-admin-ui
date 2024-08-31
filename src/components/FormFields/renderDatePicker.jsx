// import React from "react";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

// import moment from 'moment';

// const renderDatePicker = ({ input, dateFormat, maxDate,  showYearDropdown, id, date, showTimeSelect, showTimeSelectOnly, innerParentDivClass, className,  labelClass, readOnly, notes, min, defaultValue, parentDivClass, fieldClass, label, type, placeholder,placeholderText,minDate, meta: { touched, error, invalid, warning } }) => {
//    var selectedDate = null;
//    if(input.value){
//      var selectedDate = input.value;
//      if(typeof selectedDate == 'string'){
//        var selectedDate = new Date(selectedDate);
//      }

//    }

//    //console.log('lllllll=', input.value);

//    return(
//      <div className={ `${"form-group"} ${parentDivClass ? parentDivClass : ' '} ${touched && error ? ' has-error ':''}`} >
//        {(type != "hidden") && (<label className={labelClass?labelClass:""}>{label}</label>)}
//        <div className={innerParentDivClass?innerParentDivClass:"col-sm-10 col-lg-10"}>

//            <DatePicker
//              maxDate={maxDate?maxDate:null}
//              showYearDropdown={showYearDropdown?true:false}
//              showTimeSelect={showTimeSelect?true:false}
//              showTimeSelectOnly={showTimeSelectOnly?true:false}
//              name={input.name}
//              minDate={minDate?minDate:null}
//              placeholderText={placeholderText}
//              selected={selectedDate}
//              onChange={(newValue) => {
//                //console.log('lllllllllchange', newValue);
//                input.onChange(newValue)
//              }}
//              onBlur={(newValue) => {
//                //console.log('lllllllllblur', newValue);
//                //input.onBlur(newValue)
//              }}
//              dateFormat={dateFormat?dateFormat:'YYYY-MM-dd'}
//              className={className?className:'form-control'}
//              calendarClassName={"custom-calendar-container"}
//            />

//          {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
//          {
//           notes && (<div cl  assName="help-notes"><small>{notes}</small></div>)
//          }
//        </div>

//      </div>
//    )
//  }

// export default renderDatePicker;

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const renderDatePicker = ({
  input,
  dateFormat,
  maxDate,
  showYearDropdown,
  id,
  showTimeSelect,
  showTimeSelectOnly,
  innerParentDivClass,
  className,
  labelClass,
  readOnly,
  notes,
  minDate,
  parentDivClass,
  label,
  placeholderText,
  meta: { touched, error, warning },
}) => {
  // Convert input value to a Date object if it's a string
  const selectedDate = input.value ? (typeof input.value === 'string' ? new Date(input.value) : input.value) : null;

  return (
    <div className={`${"form-group"} ${parentDivClass ? parentDivClass : ''} ${touched && error ? 'has-error' : ''}`}>
      {label && <label className={labelClass ? labelClass : ""}>{label}</label>}
      <div className={innerParentDivClass ? innerParentDivClass : "col-sm-10 col-lg-10"}>
        <DatePicker
          maxDate={maxDate || null}
          showYearDropdown={!!showYearDropdown}
          showTimeSelect={!!showTimeSelect}
          showTimeSelectOnly={!!showTimeSelectOnly}
          name={input.name}
          minDate={minDate || null}
          placeholderText={placeholderText}
          selected={selectedDate}
          onChange={(newValue) => input.onChange(newValue)}
          dateFormat={dateFormat || 'yyyy-MM-dd'}
          className={className || 'form-control'}
          calendarClassName="custom-calendar-container"
        />

        {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
        {notes && <div className="help-notes"><small>{notes}</small></div>}
      </div>
    </div>
  );
};

export default renderDatePicker;
