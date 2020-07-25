'use strict'

class Login {

  get rules () {
    return {
      email: 'required|email',
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
      'email.required': 'Email réquis pour se connecter',
      'email.email': 'Entrer un email valide',
      'password.required': 'Entrer votre mot de passe'
    }
  }

}

module.exports = Login
