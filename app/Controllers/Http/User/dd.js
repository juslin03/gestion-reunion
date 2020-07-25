 // verifier la method d'envoie du formulaire
    if (request.method() == "POST") {
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

      /**checking file uploaded */
      const profileImg = request.file("img", {
        types: ["image"],
        size: "2mb"
      });
      await profileImg.move(Helpers.tmpPath("uploads"), file => {
        // renommer le fichier
        name: `${new Date().getTime()}.${file.subtype}`;
      });

      // verifier si le ficher a ete charge correctement
      if (!profileImg.moved()) {
        return profileImg.error();
      } else {
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
          user.img = profileImg;
          user.password = await Hash.make("admin");
          user.compagny_init = compagny_init;
          await user.save();
        } catch (e) {
          Logger.error(e.message);
        }
      }

       // display success message
    session.flash({
      notification: {
        type: 'success',
        message: 'Registration successful! A mail has been sent to your email address, please confirm your email address.'
      }
    })

      // const data = await request.only([
        // "fname",
        // "lname",
        // "gender",
        // "email",
        // "tel_code",
        // "tel",
        // "birthdate",
        // "birthplace",
        // "role",
        // "group",
        // "post",
        // "country",
        // "city",
        // "cityzenship",
        // "term_start",
        // "term_end",
        // "term_duration",
        // "pbox",
        // "img",
        // "password",
        // "compagny_init"
      // ]);

      // fname: data.fname;
      // lname: data.lname;
      // gender: data.gender;
      // email: data.email;
      // tel_code: data.tel_code;
      // tel: data.tel;
      // birthdate: data.birthdate;
      // birthplace: data.birthplace;
      // role: data.role;
      // group: data.group;
      // post: data.post;
      // country: data.country;
      // city: data.city;
      // cityzenship: data.cityzenship;
      // term_start: data.term_start;
      // term_end: data.term_end;
      // term_duration: 10;
      // pbox: data.pbox;
      // img: data.img;
      // password: await Hash.make("admin");
      // compagny_init: data.compagny_init;

      // try {
      //   await user.save();
      // } catch (ex) {
      //   Logger.error(ex.message);
      // }
    }

// fname: request.input("fname"),
// lname: request.input("lname"),
// gender: request.input("gender"),
// email: request.input("email"),
// tel_code: request.input("tel_code"),
// tel: request.input("tel"),
// birthdate: request.input("birthdate"),
// birthplace: request.input("birthplace"),
// role: request.input("role"),
// group: request.input("group"),
// post: request.input("post"),
// country: request.input("country"),
// city: request.input("city"),
// cityzenship: request.input("cityzenship"),
// term_start: request.input("term_start"),
// term_end: request.input("term_end"),
// term_duration: 10,
// pbox: request.input("pbox"),
// img: request.file("img", {
//   types: ["image"],
//   size: "2mb"
// }),
// password: await Hash.make("admin"),
// compagny_init: request.input("compagny_init")


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
      let user = new Add();
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


    const newUser = request.all();
    const newUserAdd = await auth.user.member().create({
      fname: newUser.fname,
      lname: newUser.lname,
      gender: newUser.gender,
      email: newUser.email,
      tel_code: newUser.tel_code,
      tel: newUser.tel,
      birthdate: newUser.birthdate,
      birthplace: newUser.birthplace,
      role: newUser.role,
      group: newUser.group,
      post: newUser.post,
      country: newUser.country,
      city: newUser.city,
      cityzenship: newUser.cityzenship,
      term_start: newUser.term_start,
      term_end: newUser.term_end,
      term_duration: 10,
      pbox: newUser.pbox,
      password: await Hash.make("admin"),
      compagny_init: newUser.compagny_init
    });
    session.flash({
      flash_info: "Utilisateur créé avec succès !!"
    });

    return response.redirect("back");
