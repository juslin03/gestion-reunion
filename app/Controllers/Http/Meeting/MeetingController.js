'use strict'
let BaseController = require("../BaseController");
const Meeting = use("App/Models/Meeting");
const uuid = use('uuid/v1');
const Logger = use("Logger");
const Hash = use("Hash");
/**
 * Resourceful controller for interacting with meetings
 */
class MeetingController extends BaseController {
  /**
   * get meeting create form
   */
  async index ({ view }) {
    return view.render('dashboard.meetings.meetingCreate');
  }

  /**
   * Render a form to be used for creating a new meeting.
   * GET meetings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new meeting.
   * POST meetings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    // create meeting
    const meeting = await Meeting.create({
      m_uid: uuid(),
      user_id: 1,
      m_type: request.input("m_type"),
      m_subject: request.input("m_subject"),
      m_desc: request.input("m_desc"),
      m_date: request.input("m_date"),
      m_from: request.input("m_from"),
      m_to: request.input("m_to"),
      m_duration: request.input("m_duration"),
      m_convocation: request.input("m_convocation"),
      m_ordre: request.input("m_ordre")
    });
    try {
      await meeting.save()
    } catch (error) {
      Logger.error(error.message())
    }
    session.flash({
      flash_info: "Reunion créé avec succès !"
    });
    return response.redirect("back");
  }

  /**
   * Display a single meeting.
   * GET meetings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showMeeting ({ params, request, response, view }) {
    var params = request.params;
    if (!params || !params.uid) {
      response.redirect("not_found");
    }

    // charger l'id de la reunion
    let meeting = await this._validateData(params.uid);

    if (meeting) {
      return view.render('dashboard.meetings.details', {
        uid: meeting.rows
      })
    }
  }


  async _validateData(uid) {
    if (!uid) {
      throw new Error("Id non valide");
    }
    let meeting = await Meeting.query()
      .where("uid", "=", uid)
      .first();
    // return meetings;

    if (!meeting || !meeting.uid) {
      throw new Error("Reunion inexistante");
    }
    return meeting;
  }

  /**
   * Render a form to update an existing meeting.
   * GET meetings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update meeting details.
   * PUT or PATCH meetings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a meeting with id.
   * DELETE meetings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MeetingController
