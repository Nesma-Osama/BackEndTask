const express=require('express');
const User=require('../Controller/User');
const UserMiddel=require("../MiddelWare/User");
const Router=express.Router();
Router.route('/SignUp').post(UserMiddel.SignUpValidate,UserMiddel.SignUpEmailValidate,User.SignUp);
Router.route('/Login').post(UserMiddel.LoginValidate,UserMiddel.LoginEmailValidate,User.Login);
Router.route('/RefreshToken').post(UserMiddel.RefreshToken,User.RefreshToken);
Router.route('/GetUser').get(UserMiddel.Token,User.GetName);
Router.route('/PasswordLink').post(UserMiddel.PasswordLinkValidate,User.GenerateLink);
Router.route('/ChangePassword/:Token').post(UserMiddel.ChangePasswordValidate,User.ChangePassword);

module.exports=Router
