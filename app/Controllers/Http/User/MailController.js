'use strict'
const Route = use("Route");
const Mail = use("App/Models/Mail");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with mail
 */
class MailController {
 async index({ view }) {
    var breadcrumb = [
      {
        name: "Mails",
        url: Route.url("/mailNew"),
        icon: "fa-envelope",
        class: ""
      },
      {
        name: "Mes messages",
        url: "javascript:void(0)",
        icon: "",
        class: "active"
      }
    ];
    view.share({
      title: "Mes messages",
      breadcrumb: breadcrumb
    });
    return view.render("dashboard.mails.compose");
  }
}

module.exports = MailController
