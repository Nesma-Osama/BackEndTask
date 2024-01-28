const User = require('../Schema/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
exports.SignUp = async (req, res) => {
    try {
        const HashedPassword = await bcrypt.hash(req.body.Password, 10);
        const user = await User.create({ Name: req.body.Name, Email: req.body.Email, Password: HashedPassword });
        return res.status(200).send({ Msg: 'Created' });
    }
    catch (e) {
        return res.status(500);
    }
}
exports.Login = async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        const IsMatch = await bcrypt.compare(req.body.Password, user.Password);
        if (IsMatch === false)
            return res.status(401).send({ Token: null, RdfreshToken: null, Msg: 'Enter a valid email or password' });
        else {
            const AccessToken = await jwt.sign({ id: user._id }, process.env.AccessToken, { expiresIn: process.env.ExpireIn });
            const RdfreshToken = await jwt.sign({ id: user._id }, process.env.RefreshToken, { expiresIn: process.env.ExpireInRefresh });
            return res.status(200).send({ Token: AccessToken, RdfreshToken: RdfreshToken, Msg: 'Logged successfully' });
        }
    }
    catch (e) {
        return res.status(500);
    }
}

exports.RefreshToken = async (req, res) => {
    try {
        const AccessToken = await jwt.sign({ id: req.id }, process.env.AccessToken, { expiresIn: process.env.ExpireIn });
        const RefreshToken = await jwt.sign({ id: req.id }, process.env.RefreshToken, { expiresIn: process.env.ExpireInRefresh });
        res.status(200).send({ Token: AccessToken, RefreshToken: RefreshToken, Msg: 'Generate token successfully' })
    }
    catch (e) {
        return res.status(500);
    }

}

exports.GetName = async (req, res) => {
    try {
        const id = req.id;
        const user = await User.findById(id);
        return res.status(200).send({ Name: user.Name });
    }
    catch (e) {
        return res.status(500);
    }
}

exports.GenerateLink = async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        const Token = await jwt.sign({ id: user.id }, process.env.AccessToken, { expiresIn: process.env.LinkExpire });
        const Link = `http://localhost:3100/User/ChangePassword/${Token}`;
        GenerateEmail(user.Email,Link);
        return res.status(200).send({Msg:'The email was sent.'})
    }
    catch (err) {
        return res.status(500);
    }
}

exports.ChangePassword = async (req, res) => {
    try {

        const user = await User.findById(req.UserId);
        user.Password = await bcrypt.hash(req.body.Password, 10);
        user.save();
        return res.status(200).send({Msg:'Password is changed successfully'});
    }
    catch (err) {
        return res.status(500);
    }
}
const GenerateEmail = async (Email,Link) => {
    try {
        const Transport = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EmailAddress,
            port: 465,
            secure: true,
            auth: {

                user: process.env.EmailAddress,
                pass: process.env.AppPassword,
            },
        });
        await Transport.sendMail({
            From:`"${process.env.UserName}" <${process.env.EmailAddress}>`,
            to:Email,
            subject:'Password Change Link',
            text:`To change your password click on this link ${Link} \n\n This link will be expired after ${process.env.LinkExpire}`
        })

    }
    catch (err) {
        return res.status(500);
    }
}