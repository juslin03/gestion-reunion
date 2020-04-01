"use strict";

const { validate } = use("Validator");
const Hash = use("Hash");
const Mail = use("Mail");
const User = use("App/Models/User");
const Event = use("Event");
var moment = require("moment");

class AuthController {

  async login({ request, session, response, auth }) {
    const data = request.only([
      "email",
      "password",
      "remember"
    ]);
    const { email, password } = request.all();

    const user = await User.findBy("email", email); //findBy

//loginError
    if(!user) {
        session.flash({flash_error: 'Aucun compte n\'est trouvé pour l\'adresse email fourni.'})
        return response.redirect('back');
    }

    if (user.confirmation_token) {
      session.flash({
        flash_error: "Please verify your account first."
      });
      return response.redirect("back");
    }

   const math_password = await Hash.verify(password, user.password);

    if (!math_password) {
      session.flash({
        flash_error: "Le mot de passe fourni est incorrecte. Veuillez réessayer."
      });
      return response.redirect("back");
    }
    // try {
    //     await auth.attempt(email, password);
    //     return response.redirect('/');
    // } catch (error) {
    //     session.flash({loginError: 'These credentials do not work.'})
    //     return response.redirect('/login');
    // }

    try {
      await auth.login(user);
      // await auth.generate(user);
      user.last_login = moment().format("YYYY-MM-D H:mm:ss"); // August 13th 2019, 3:19:18 pm
      await user.save();
      return response.route("root");
    } catch (e) {
      session.flash({
        flash_error: e.message
      });
      return response.redirect("back");
    }
  }


  async confirm({ response, session, params }) {
    const token = params.token;
    const user = await User.findBy("confirmation_token", token);

    if (!token.length) {
      return response.redirect("root");
    }

    if (user) {
      user.confirmation_token = null;
      await user.save();
      session.flash({
        flash_info: "Compte vérifié ! Vous pouvez vous connecter maintenant."
      });
    }

    return response.route("root");
  }

  /**
   * resend confirmation token
   */
  async resend({ request, response, session }) {
    const data = request.only(["email"]);

    const user = await User.findBy("email", data.email);
    if (!user) {
      session.flash({
        flash_info:"If the email you entered was right, in a minute you will receive the link to confirm your account."
      });
      return response.redirect("login");
    }

    if (!user.confirmation_token) {
      session.flash({
        flash_info: "Your account is already verified."
      });
      return response.route("root");
    }

    Event.fire("RESEND_CONFIRMATION", user);

    session.flash({
      flash_info:"If the email you entered was right, in a minute you will receive the link to confirm your account."
    });
    return response.route("login");
  }



  /**
   * forgot password
   */
  async forgot({ request, response, session }) {
    const data = request.only(["email"]);
    const user = await User.findBy("email", data.email);
    if (!user) {
      session.flash({
        flash_error:"If the email you entered was right, in a minute you will receive the link to reset the password."
      });
      return response.redirect("back");
    }

    // user.reset_token = uuid();
    await user.save();

    Event.fire("FORGOT_PASSWORD", user);

    session.flash({
      flash_info:"If the email you entered was right, in a minute you will receive the link to reset the password."
    });
    return response.route("root");
  }

  async reset_view({ response, params, view }) {
    const token = params.token;

    if (!token.length) {
      return response.route("root");
    }

    const user = await User.findBy("reset_token", token);
    if (!user) {
      return response.route("root");
    }
    return view.render("auth.reset", {
      token: token
    });
  }

  /**
   * Reset password
   */
  async reset({ request, response, session }) {
    const data = request.only(["token", "password"]);
    const user = await User.findBy("reset_token", data.token);
    if (!user) {
      return response.route("root");
    }
    user.password = await Hash.make("123456789");
    // user.reset_token = null
    try {
      await user.save();
    } catch (ex) {
      Logger.error(ex.message);
      return response.redirect("back");
    }
    session.flash({
      flash_info: "Mot de passe modifié avec succès !."
    });
    return response.route("root");
  }

  /**
   * Logout
   */
  async logout({ response, session, auth }) {
    session.flash({
      flash_info: "Vous êtes maintenant déconnecté !"
    });
    await auth.logout();
    return response.route("login");
  }
}

module.exports = AuthController;
