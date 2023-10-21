const Author = require('../models/Author');


exports.author_get_all = async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
};

exports.author_get_byId = async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).send('Author not found');
    }
    res.json(author);
};

exports.author_create_new = async (req, res) => {
  const { name, bio, birthdate, image } = req.body;
    const author = new Author({
      name,
      bio,
      birthdate,
      image
    });
    await author.save();
    res.json(author);
};

exports.author_update = async (req, res) => {
  const { name, bio, birthdate} = req.body;
    const author = await Author.findByIdAndUpdate(req.params.id, {
      name,
      bio,
      birthdate,
    }, { new: true });
    if (!author) {
      return res.status(404).send('Author not found');
    }
    res.json(author);
};

exports.author_delete = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) {
    return res.status(404).send('Author not found');
  }
  res.json(author);
};