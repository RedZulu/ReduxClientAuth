import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const renderField = ({ input, label, type, meta: { touched, error } }) => (
      <div>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span className="error">{error}</span>}
      </div>
    )

    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field name="email" component={renderField} label="Email:"  />
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" type="password" component={renderField} label="Password:" />
        </fieldset>
        <fieldset className="form-group">
          <Field name="passwordConfirm" type="password" component={renderField} label="Confirm Password:" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {}
  if (!formProps.email) {
    errors.email = 'Please enter an email address'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  if(!formProps.password){
    errors.password = 'Please enter a password'
  } else if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const signUpForm = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);

export default connect(mapStateToProps, actions)(signUpForm);
