const Post = require('../Schema/PostSchema');
exports.CreatePost = async (req, res) => {
  try {
    const post = await Post.create({ Title: req.body.Title, Description: req.body.Description, UserId: req.id });
    return res.status(200).send({ Msg: 'Created successfully' });
  }
  catch (e) {
    return res.status(500);
  }
}
exports.GetPosts = async (req, res) => {
  try {
    const Posts = await Post.find({ UserId: req.id });
    return res.status(200).send(Posts);
  }
  catch (e) {
    return res.status(500);
  }
}
