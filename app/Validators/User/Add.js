'use strict'

class UserAdd {
  get rules () {
    return {
      fname: 'required|min:2',
      lname: 'required|min:2',
      gender: 'required',
      email: 'required|email|unique:users',
      tel_code: 'required',
      tel: 'required|unique:users',
      birthdate: 'required',
      birthplace: 'required|min:2',
      role: 'required',
      group: 'required',
      post: 'required|min:2',
      country: 'required',
      city: 'required|min:2',
      cityzenship: 'required|min:2',
      term_start: 'required',
      term_end: 'required',
      compagny_init: 'required'
    }
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email'
    }
  }

  get messages() {
    return {
      required: 'Whoo !! Tous les champs sont requis',
      unique: 'Attention ! {{ field }} est déjà pris',
      min: '{{ field }} est trop court!'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = UserAdd
