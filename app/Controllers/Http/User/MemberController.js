"use strict";
let BaseController = require("../BaseController");
const Route = use("Route");
const Logger = use("Logger");
const Helpers = use("Helpers");
const Hash = use("Hash");
const Member = use("App/Models/Member");

class MemberController extends BaseController {
  async add({ route, session, view, auth }) {
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
        icon: "fa fa-user-plus",
        class: ""
      }
    ];
    view.share({
      title: "Ajouter un utilisateur",
      breadcrumb: breadcrumb
    });

    // afficher les codes pays telephoniques
    var phoneCode = await this.phoneCode();
    return view.render("User.add", {
      phoneCode: phoneCode
    });
  }

  async newAdd({ request, session, response }) {
    // create member
    const member = await Member.create({
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
      password: await Hash.make("admin"),
      compagny_init: request.input("compagny_init")
    });

    session.flash({
      flash_info: "Utilisateur créé avec succès !"
    });
    return response.redirect("back");
  }

  // member login
 async memberLogin({ request, session, response, auth }) {
    const data = request.only([
      "email",
      "password",
      "remember"
    ]);
    const { email, password } = request.all();

    const member = await Member.findBy("email", email); //findBy

//loginError
    if(!member) {
        session.flash({flash_error: 'Aucun compte n\'est trouvé pour l\'adresse email fourni.'})
        return response.redirect('back');
    }


    const member_password = await Hash.verify(password, member.password);

    if (!member_password) {
      session.flash({
        flash_error: "Le mot de passe fourni est incorrecte. Veuillez réessayer."
      });
      return response.redirect("back");
    }

    try {
      await auth.memberLogin(member);
      // await auth.generate(user);
      member.last_login = moment().format("YYYY-MM-D H:mm:ss"); // August 13th 2019, 3:19:18 pm
      await member.save();
      return response.route("root");
    } catch (e) {
      session.flash({
        flash_error: e.message
      });
      return response.redirect("back");
    }
  }

}

module.exports = MemberController;
