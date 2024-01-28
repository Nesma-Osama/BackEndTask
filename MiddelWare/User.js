const User = require('../Schema/UserSchema');
const jwt = require('jsonwebtoken');
exports.SignUpValidate = async (req, res, next) => {
   if (req.body.Name == null)
      return res.status(400).send({ Msg: 'Name is required' });
   if (req.body.Password == null)
      return res.status(400).send({ Msg: 'Password is required' });
   if (req.body.Email == null)
      return res.status(400).send({ Msg: 'Email is required' });
   if (req.body.Name.length <= 2)
      return res.status(422).send({ Msg: 'Name must be greater than 2' });
   else if (req.body.Name.length > 30)
      return res.status(422).send({ Msg: 'Name must be less than 31' });
   else if (req.body.Password.length == 0)
      return res.status(422).send({ Msg: 'Password is required' });
   if (req.body.Email.length > 100)
      return res.status(422).send({ Msg: 'Email must be less than 101' });
   else if (req.body.Email.length < 5)
      return res.status(422).send({ Msg: 'Email must be greater than 4' });

   else next();
}

exports.SignUpEmailValidate = async (req, res, next) => {
   var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
   if (regexEmail.test(req.body.Email)) {
      req.body.Email = req.body.Email.toLowerCase();
      let Exist = await User.exists({ Email: req.body.Email });
      if (Exist) {
         return res.status(409).send({ Msg: 'This email is already exists' });
      }
      else next();

   }
   else
      return res.status(422).send({ Msg: 'Must enter a valid email please' });


}

exports.LoginEmailValidate = async (req, res, next) => {

   var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

   if (regexEmail.test(req.body.Email)) {

      req.body.Email = req.body.Email.toLowerCase();
      let Exist = await User.exists({ Email: req.body.Email });
      if (!Exist) {
         return res.status(404).send({ Token: null, RdfreshToken: null, Msg: 'Must enter a valid email or password' });
      }
      else next();
   }

   else
      return res.status(422).send({ Token: null, RdfreshToken: null, Msg: 'Must enter a valid email please' });

}
exports.LoginValidate = async (req, res, next) => {
   if (req.body.Password == null)
      return res.status(400).send({ Token: null, RdfreshToken: null, Msg: 'Password is required' });
   if (req.body.Email == null)
      return res.status(400).send({ Token: null, RdfreshToken: null, Msg: 'Email is required' });
   if (req.body.Email.length > 100)
      return res.status(422).send({ Token: null, RdfreshToken: null, Msg: 'Email must be less than 101' });
   else if (req.body.Email.length < 5)
      return res.status(422).send({ Token: null, RdfreshToken: null, Msg: 'Email must be greater than 4' });
   else if (req.body.Password.length == 0)
      return res.status(422).send({ Token: null, RdfreshToken: null, Msg: 'Password is required' });
   else next();
}
exports.RefreshToken = async (req, res, next) => {
   try {
      const Refresh = req.body.RefreshToken;
      if (!Refresh)
         return res.status(401).send({Msg:'Refresh token is required'});
      await jwt.verify(Refresh, process.env.RefreshToken, (err, id) => {
         if (err)
            return res.status(403).send({Msg:'You Must Login'});
         req.id = id.id;
         next();
      })
   }
   catch (e) {
      return res.status(500);
   }
}
exports.Token = async (req, res, next) => {
   try {
      const AuthHeader = req.headers['authorization'];
      const Token = AuthHeader && AuthHeader.split(' ')[1];
      if (Token == null)
         return res.status(401).send({Msg:'Token is required'});//there is no token
      await jwt.verify(Token, process.env.AccessToken, (err, id) => {
         if (err)
            return res.status(403).send({Msg:'Your token is expired'});
         req.id = id.id;
         next();
      }
      )
   }
   catch (e) {
      return res.status(500);
   }
}
exports.PasswordLinkValidate = async (req, res, next) => {

   var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

   if (regexEmail.test(req.body.Email)) {

      req.body.Email = req.body.Email.toLowerCase();
      let Exist = await User.exists({ Email: req.body.Email });
      if (!Exist) {
         return res.status(404).send({ Msg: 'Must enter a valid email' });
      }
      else next();
   }

   else
      return res.status(422).send({ Msg: 'Must enter a valid email please' });

}
exports.ChangePasswordValidate = async (req, res, next) => {

   const Token  = req.params.Token;
   if (!Token)
      return res.status(401).send({Msg:'Must use the link please'});
   if (req.body.Password == null)
      return res.status(400).send({ Msg: 'Password is required' });
   else if (req.body.Password.length == 0)
      return res.status(422).send({ Msg: 'Password is required' });
   await jwt.verify(Token, process.env.AccessToken, (err, id) => {
      if (err)
         return res.status(403).send({Msg:'Link is expired request PasswordLink again please'});
      req.UserId = id.id;
   })
   next();
}