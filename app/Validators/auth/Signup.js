'use strict'

class Signup {

  get rules () {
    return {
      first_name: 'required',
      last_name: 'required',
      email: 'required|email|unique:users',
      password: 'required'

    }
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email'
    }
  }

  get messages () {
    return {
      'fname.required': 'Enter your first name',
      'lname.required': 'Enter your last name',
      'email.required': 'Enter your email address',
      'email.email': 'Email address is not valid',
      'email.unique': 'There\'s already an account with this email address',
      'password.required': 'Choose password for your account'
    }
  }

}

module.exports = Signup
