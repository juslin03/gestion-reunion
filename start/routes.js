"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.group(() => {
//   Route.get('/', 'ChoiceController.index').as('root');
// }).middleware('auth');

Route.group(() => {
  Route.get("/", "HomeController.index").as("root");
}).middleware("auth");

Route.group(() => {
  Route.get("/phonecode", "HomeController.phonecode").as("phonecode");
}).prefix("api");

Route.on("/forgot")
  .render("auth.forgot")
  .as("forgot")
  .middleware(["authenticated"]);

Route.on("/login")
  .render("auth.login")
  .as("login")
  .middleware(["authenticated"]);

Route.on("/choice")
  .render("index")
  .as("choice")
  .middleware(["authenticated"]);

Route.get("/logout", "AuthController.logout").as("logout");
Route.get("/not_found", "ErrorController.index").as("not_found");
Route.get("/reset/:token", "AuthController.reset_view").as("reset");

Route.group(() => {
  Route.post("/login", "AuthController.login")
    .as("auth.login")
    .validator("auth/Login");
  Route.post("/resend", "AuthController.resend")
    .as("auth.resend")
    .validator("auth/Resend");
  Route.post("/forgot", "AuthController.forgot").as("auth.forgot");
  Route.post("/reset", "AuthController.reset")
    .as("auth.reset")
    .validator("auth/Reset");
}).prefix("auth");

Route.on("/mailNew")
  .render("dashboard.mails.compose")
  .as("compose")
  .middleware("auth");
Route.on("/mailInbox")
  .render("dashboard.mails.mailbox")
  .as("inbox")
  .middleware("auth");
Route.on("/mailRead")
  .render("dashboard.mails.read-mail")
  .as("read")
  .middleware("auth");

// Route.group(() => {
//   // router.get('/mailNew', 'MailController.index').as('mailWrite');
//   router.get('/mailNew', 'MailController.index').as('mailInbox');
//   // router.get('/trash', 'MailController.trash').as('mailTrash');
//   // router.get('/corbeille', 'MailController.corbeille').as('mailCorbeille');
// }).prefix('mail')
// // User Controller

Route.group(() => {
  Route.get("/manage", "User/UserController.manage").as("userManage");
  Route.get("/add", "User/UserController.addForm").as("userAdd");
  Route.post("/newAdd", "User/UserController.newAdd")
    .as("newAdd")
    .validator("User/Add");
  Route.get("/edit/:id", "User/UserController.edit").as("userEdit");
  Route.post("/edit/:id", "User/UserController.edit")
    .as("userEdit")
    .validator("User/Edit");
  Route.delete("/:id/delete", "User/UserController.delete").as("userDelete");
})
  .prefix("user")
  .middleware("auth");

Route.on("/profile")
  .render("User.profile")
  .as("profile");


// create meeting
Route.get("/meetings", "Meeting/MeetingController.index")
  .as("meetingCreate")
  .middleware("auth");
