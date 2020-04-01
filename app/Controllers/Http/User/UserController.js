"use strict";
let BaseController = require("../BaseController");
const Route = use("Route");
const Logger = use("Logger");
const Helpers = use("Helpers");
const User = use("App/Models/User");
const Member = use("App/Models/Member");
const { validate } = use("Validator");
const Event = use("Event");
var moment = require("moment");
const uuid = use('uuid/v1');

class UserController extends BaseController {
  // gerer les utilisateurs
  async manage({ route, request, response, session, view }) {
    let breadcrumb = [
      {
        name: "Accueil",
        url: Route.url("/"),
        icon: "fa-dashboard",
        class: "",
        content: ""
      },
      {
        name: "Utilisateur",
        url: "javascript:void(0)",
        icon: "",
        class: "active",
        content: "<span>dffd</span>"
      }
    ];
    view.share({
      title: "Utilisateurs",
      breadcrumb: breadcrumb
    });

    // charger tous les utilisateurs de la base de donnees
    let users = await User.all();
    // let members = await Member.all();
    return view.render("User.index", {
      users: users.rows
      // members: members.rows
    });
  }

async newAdd({ request, session, response }) {
    // create member
    const user = await User.create({
      uid: uuid(),
      fname: request.input("fname"),
      lname: request.input("lname"),
      gender: request.input("gender"),
      email: request.input("email"),
      tel_code: request.input("tel_code"),
      tel: request.input("tel"),
      birthdate: request.input("birthdate"),
      birthplace: request.input("birthplace"),
      role: request.input("role"),
      group: request.input("group"),
      post: request.input("post"),
      country: request.input("country"),
      city: request.input("city"),
      cityzenship: request.input("cityzenship"),
      term_start: request.input("term_start"),
      term_end: request.input("term_end"),
      term_duration: 10,
      pbox: request.input("pbox"),
      password: "admin",
      compagny_init: request.input("compagny_init")
    });

    session.flash({
      flash_info: "Utilisateur créé avec succès !"
    });
    return response.redirect("back");
  }


  // modifier un les informations de l'admin
  async edit({ route, request, response, session, view }) {
    // creer le breadcrumb
    var breadcrumb = [
      {
        name: "Accueil",
        url: Route.url("/"),
        icon: "fa-dashboard",
        class: ""
      },
      {
        name: "Utilisateurs",
        url: Route.url("User/UserController.manage"),
        icon: "",
        class: ""
      }
    ];
    view.share({
      title: "Modifier un utilisateur",
      breadcrumb: breadcrumb
    });
    var params = request.params;
    if (!params || !params.id) {
      response.redirect("not_found");
    }

    // charger l'id de l'utilisateur
    let user = await this._validateData(params.id);
    if (request.method() == "POST") {
      const data = request.only(["fname", "lname", "city"]);
      user.fname = data.fname;
      user.lname = data.lname;
      user.city = data.city;
      try {
        await user.save();
      } catch (ex) {
        Logger.error(ex.message);
      }
      session.flash({
        flash_info: "Modification effectuée avec succès !"
      });
      return response.redirect("back");
    }

    // afficher code pays
    let phoneCode = await this.phoneCode();
    return view.render("User.edit", {
      phoneCode,
      user
    });
  }

  async _validateData(id) {
    if (!id) {
      throw new Error("Id non valide");
    }
    let user = await User.query()
      .where("id", "=", id)
      .first();
    // return user;

    if (!user || !user.id) {
      throw new Error("Utilisateur inexistant");
    }
    return user;
  }

  async delete({ response, session, params}) {
    let user = await this._validateData(params.id);
    await user.delete();

    session.flash({
      flash_info: "Utilisateur supprimé avec succès !"
    });

    return response.redirect('back');
  }
}

module.exports = UserController;
