import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from './FormFields/renderFieldLabelTransition';
import renderField from './FormFields/renderField';
import renderReactSelect from './FormFields/renderReactSelect';
import {Redirect, BrowserRouter, Link} from 'react-router-dom';
import { signInUser, signInUserSuccess, getCountryList, getCountryListSuccess } from '../actions/users';
//import { NotificationManager} from 'react-notifications';
import createHistory from 'history/createBrowserHistory';
import {toast} from 'react-toastify';
import $ from 'jquery';

const history = createHistory();

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.country || values.country <= 0) {
    errors.country = 'Enter country';
    hasErrors = true;
  }

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  return hasErrors && errors;
}

class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      is_submitting: false,
      countryList: props.countryList,
      auth: props.auth
    }
  }

submitLoginForm(values){
  return signInUser(values)
  .then((result) => {
    localStorage.setItem('jwtToken', result.data.data.user.token);
    localStorage.setItem('currencyCode', result.data.data.user.currencyCode);
    localStorage.setItem('currencySymbol', result.data.data.user.currencySymbol);
    localStorage.setItem('permissions', JSON.stringify(result.data.data.user.permissions));
    localStorage.setItem('hasAllAccess', result.data.data.user.hasAllAccess||false);
    localStorage.setItem('auth', JSON.stringify(result.data.data));
    localStorage.setItem('contentlanguage', result.data.data.user.language ? result.data.data.user.language : 'en');
    localStorage.setItem('dieterystatus', typeof result.data.data.user.showVeg !== 'undefined' ? result.data.data.user.showVeg : 1);
    this.props.signInUserSuccess(result.data.data.user); 
  }).catch(error => {
    console.log('error', JSON.stringify(error));
    //throw new SubmissionError(error.response.data.error);
  })
}

  componentDidMount(){
    if($('.onclick').length > 0){
      $('.onclick').find('input[type=text],input[type=email], input[type=password], textarea').each(function(){
        if($(this).val().replace(/\s+/, '') != '')
          $(this).addClass('active');
      });
      $('.onclick').find('input[type=text],input[type=email], input[type=password], textarea').change(function(){
        if($(this).val().replace(/\s+/, '') == ''){
          $(this).val('').removeClass('active');
        }else
          $(this).addClass('active');
      });
    }

    $('.show-password-option').click(function(){
      $(this).toggleClass('active');
      //$('#password-field').attr("type", 'text');
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
      if ($('.eye-icon').attr("name") == "md-eye-off") {
        $('.eye-icon').attr("name", "md-eye");
      } else {
        $('.eye-icon').attr("name", "md-eye-off");
      }

    })

    getCountryList().then((response) => {
      this.props.getCountryListSuccess(response.data.data);
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth === true){
      this.setState({
        auth: true
      });
    }
  }

  render() {
    if (this.state.auth === true) {
      return <Redirect to='/dashboard'/>
    }
    const {handleSubmit, pristine, submitting, countryList} = this.props;
    //console.log('000', this.props);
    return (
      <div className="form-block-section">
        <form onSubmit={handleSubmit(this.submitLoginForm.bind(this))} className = "p-t-15">
          <Field
            label="country"
            name='country'
            optionLabel='country'
            optionValue='id'
            options={countryList}
            component={renderReactSelect}
            placeholder="Select Country"
            multi={false}
            parentDivClass="form-group"
            onBlur={event => event.preventDefault()}
          />

          <Field
            name="email"
            component={renderField}
            type="text"
            className="form-control"
            label="Email"
            placeholder="Email address"
          />

          <Field
            name="password"
            component={renderField}
            type="password"
            className="form-control"
            placeholder="Password"
            label="Password"
          />
          <button type="submit" disabled={submitting} className="btn-primary-full">LOGIN NOW {submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          
        </form>
      </div>
    )
  }
}

LoginForm = reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm)

const mapStateToProps = (state, ownProps) => {
  const states = {
    countryList: [...state.User.country_list],
    auth: state.User.auth,
    status: state.User.status
  };
  return states;
}

const mapDispatchToProps = (dispatch) => {
  return{
    getCountryListSuccess: (payload) => {
      dispatch(getCountryListSuccess(payload));
    },
    signInUserSuccess: (data) => {
      dispatch(signInUserSuccess(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);