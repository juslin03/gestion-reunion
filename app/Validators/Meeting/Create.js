'use strict'

class MeetingCreate {
  get rules () {
    return {
      // validation rules
      m_type: 'required',
      m_subject: 'required|min:2',
      m_desc: 'required|min:10',
      m_date: 'required',
      m_from: 'required',
      m_to: 'required',
      m_duration: 'required',
      m_convocation: 'required',
      m_ordre: 'required'
    }
  }

  get messages() {
    return {
      required: 'Whoo! {{ field }} obligatoire',
      min: '{{ field }} trop court'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect('back');
}

module.exports = MeetingCreate
