// "use strict";
// let BaseController = require("../BaseController");
// const Route = use("Route");
// const Logger = use("Logger");
// const Helpers = use("Helpers");
// const Hash = use("Hash");
// const User = use("App/Models/User");
// const { validate } = use("Validator");
// const Event = use("Event");
// var moment = require("moment");

// class UserController extends BaseController {
//   // gerer les utilisateurs
//   async manage({ route, request, response, session, view }) {
//     let breadcrumb = [
//       {
//         name: "Accueil",
//         url: Route.url("/"),
//         icon: "fa-dashboard",
//         class: "",
//         content: ""
//       },
//       {
//         name: "Utilisateur",
//         url: "javascript:void(0)",
//         icon: "",
//         class: "active",
//         content: "<span>dffd</span>"
//       }
//     ];
//     //url: Route.url('User/UserController.manage'),
//     view.share({
//       title: "Utilisateurs",
//       breadcrumb: breadcrumb
//     });

//     // charger tous les utilisateurs
//     let users = await User.all();
//     return view.render("User.index", {
//       users: users.rows
//     });
//   }

//   //ajouter un utilisateur
//   async add({ route, request, response, session, view }) {
//     var breadcrumb = [
//       {
//         name: "Accueil",
//         url: Route.url("/"),
//         icon: "fa-dashboard",
//         class: ""
//       },
//       {
//         name: "Utilisateurs",
//         url: Route.url("User/UserController.manage"),
//         icon: "fa fa-user-plus",
//         class: ""
//       }
//     ];
//     view.share({
//       title: "Ajouter un utilisateur",
//       breadcrumb: breadcrumb
//     });

//     // afficher les codes pays telephoniques
//     var phoneCode = await this.phoneCode();
//     return view.render("User.add", {
//       phoneCode: phoneCode
//     });

//     if (request.method() == "POST") {
//       const {
//         fname,
//         lname,
//         gender,
//         email,
//         tel_code,
//         tel,
//         birthdate,
//         birthplace,
//         role,
//         group,
//         post,
//         country,
//         city,
//         cityzenship,
//         term_start,
//         term_end,
//         term_duration,
//         pbox,
//         compagny_init
//       } = request.all();

//       // /**checking file uploaded */
//       // const profileImg = request.file("img", {
//       //   types: ["image"],
//       //   size: "2mb"
//       // });
//       // await profileImg.move(Helpers.tmpPath("uploads"), file => {
//       //   // renommer le fichier
//       //   name: `${new Date().getTime()}.${file.subtype}`;
//       // });

//       // verifier si le ficher a ete charge correctement
//       // if (!profileImg.moved()) {
//       //   return profileImg.error();
//       // } else {
//         try {
//           // appeler le model User
//           let user = new User();
//           user.fname = fname;
//           user.lname = lname;
//           user.gender = gender;
//           user.email = email;
//           user.tel_code = tel_code;
//           user.tel = tel;
//           user.birthdate = birthdate;
//           user.birthplace = birthplace;
//           user.role = role;
//           user.group = group;
//           user.post = post;
//           user.country = country;
//           user.city = city;
//           user.cityzenship = cityzenship;
//           user.term_start = term_start;
//           user.term_end = term_end;
//           user.term_duration = 10;
//           user.pbox = pbox;
//           user.img = profileImg;
//           user.password = await Hash.make("admin");
//           user.compagny_init = compagny_init;
//           await user.save();
//         } catch (e) {
//           Logger.error(e.message);
//         }
//       // }

//       // display success message
//       session.flash({
//         notification: {
//           type: "success",
//           message:
//             "Registration successful! A mail has been sent to your email address, please confirm your email address."
//         }
//       });
//     }
//   }

//   // modifier un utilisateur
//   async edit({ route, request, response, session, view }) {
//     // creer le breadcrumb
//     var breadcrumb = [
//       {
//         name: "Accueil",
//         url: Route.url("/"),
//         icon: "fa-dashboard",
//         class: ""
//       },
//       {
//         name: "Utilisateurs",
//         url: Route.url("User/UserController.manage"),
//         icon: "",
//         class: ""
//       }
//     ];
//     view.share({
//       title: "Modifier un utilisateur",
//       breadcrumb: breadcrumb
//     });
//     var params = request.params;
//     if (!params || !params.id) {
//       response.redirect("not_found");
//     }

//     // charger l'id de l'utilisateur
//     let user = await this._validateData(params.id);
//     if (request.method() == "POST") {
//       const data = request.only(["fname", "lname", "city"]);
//       user.fname = data.fname;
//       user.lname = data.lname;
//       user.city = data.city;
//       try {
//         await user.save();
//       } catch (ex) {
//         Logger.error(ex.message);
//       }
//       session.flash({
//       flash_info:"Modification effectuée avec succès !"
//     });
//       return response.redirect('back');
//     }

//     // afficher code pays
//     let phoneCode = await this.phoneCode();
//     return view.render("User.edit", {
//       phoneCode,
//       user
//     });
//   }

//   async _validateData(id) {
//     if (!id) {
//       throw new Error("Invalid User ID");
//     }
//     let user = await User.query()
//       .where("id", "=", id)
//       .first();
//     // return user;

//     if (!user || !user.id) {
//       throw new Error("User does not exit");
//     }
//     return user;
//   }
// }

// module.exports = UserController;


  //ajouter un utilisateur
  async add({ route, request, response, session, view }) {
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

    const {
      fname,
      lname,
      gender,
      email,
      tel_code,
      tel,
      birthdate,
      birthplace,
      role,
      group,
      post,
      country,
      city,
      cityzenship,
      term_start,
      term_end,
      term_duration,
      pbox,
      compagny_init
    } = request.all();
    try {
      // appeler le model User
      let user = new User();
      user.fname = fname;
      user.lname = lname;
      user.gender = gender;
      user.email = email;
      user.tel_code = tel_code;
      user.tel = tel;
      user.birthdate = birthdate;
      user.birthplace = birthplace;
      user.role = role;
      user.group = group;
      user.post = post;
      user.country = country;
      user.city = city;
      user.cityzenship = cityzenship;
      user.term_start = term_start;
      user.term_end = term_end;
      user.term_duration = 10;
      user.pbox = pbox;
      user.password = await Hash.make("admin");
      user.compagny_init = compagny_init;

      await user.save();
    } catch (e) {
      Logger.error(e.message);
    }
  }
