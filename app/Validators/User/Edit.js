'use strict'

class UserEdit {
  get rules() {
    return {
      fname: 'required|min:5',
      lname: 'required|min:5',
      city: 'required'
    }
  }
  get messages() {
    return {
      'fname.min': 'Le prenom fourni est trop court!',
      'lname.min': 'Le nom fourni est trop court',
      'fname.required': 'Vous devez fournir un prenom.',
      'lname.required': 'Vous devez fournir un nom.',
      'city.required': 'Vous devez fournir la ville actuelle.',

    }
  }
}

module.exports = UserEdit
