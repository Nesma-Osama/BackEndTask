const express=require('express');
const PostsController=require('../Controller/Post');
const UserMiddelWare=require('../MiddelWare/User');
const PostMiddelWare=require('../MiddelWare/Post')

const Router=express.Router();
Router.route('/Create').post(UserMiddelWare.Token,PostMiddelWare.PostValidate,PostsController.CreatePost);
Router.route('/Get').get(UserMiddelWare.Token,PostsController.GetPosts);
module.exports=Router;