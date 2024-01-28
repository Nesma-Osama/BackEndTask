const Post = require('../Schema/PostSchema');
exports.PostValidate = async (req, res, next) => {
    if (req.body.Title == null)
        return res.status(400).send({ Msg: 'Title is required' });
    if (req.body.Description == null)
        return res.status(400).send({ Msg: 'Description is required' });
    if (req.body.Title.length < 2)
        return res.status(422).send({ Msg: 'Title must be at lest 2' });
    if (req.body.Title.length > 20)
        return res.status(422).send({ Msg: 'Title must be at most 20' });
    if (req.body.Description.length < 1)
        return res.status(422).send({ Msg: 'Description must be at lest 1' });
    if (req.body.Description.length > 500)
        return res.status(422).send({ Msg: 'Description must be at most 500' });
    next();
}