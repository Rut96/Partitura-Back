const Songs = require('../models/Songs');

exports.songs_get_all = async (req, res) => {
    let songs = await Songs.find();
    songs = songs.map((song, idx)=>{
      let { image, title, dateAdded, author, _id, lyrics } = song;
      return {
        image, 
        title, 
        dateAdded,
        author,
        _id,
        lyrics
      }
    })
    res.json(songs);
};

exports.songs_get_byId = async (req, res) => {
    console.log(req);
    const song = await Songs.findById(req.params.id);
    if (!song) {
      return res.status(404).send('Song not found');
    }
    res.json(song);
};

exports.add_new_song = async (req, res) => {
    const song = new Songs(req.body);
    await song.save();
    res.json(song);
};

exports.update_song = async (req, res) => {
    const song = await Songs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) {
      return res.status(404).send('Song not found');
    }
    res.json(song);
};

exports.delete_song = async (req, res) => {
    const song = await Songs.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send('Song not found');
    }
    res.send('Song deleted successfully');
};

exports.search_song_by_title = async (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).send('Please provide a title');
    }
    const songs = await Songs.find({ title: { $regex: title, $options: 'i' } });
    res.json(songs);
};

exports.search_song_by_author = async (req, res) => {
    const { author } = req.params;
    if (!author) {
      return res.status(400).send('Please provide an author');
    }
    const songs = await Songs.find({ author: { $regex: author, $options: 'i' } });
    res.json(songs);
};

exports.search_song_by_genre = async (req, res) => {
    const { genre } = req.params;
    if (!genre) {
      return res.status(400).send('Please provide a genre');
    }
    const songs = await Songs.find({ genre: { $regex: genre, $options: 'i' } });
    res.json(songs);
};

exports.search_song_by_type = async (req, res) => {
    const { type } = req.params;
    if (!type) {
      return res.status(400).send('Please provide a genre');
    }
    const songs = await Songs.find({ type: { $regex: type, $options: 'i' } });
    res.json(songs);
};


exports.getTenLastAdded = async (req, res) => {
  // Find the 10 most recently added songs
  let songs = await Songs.find({})
  .sort({ dateAdded: -1 }) // Sort by createdAt field in descending order (newest first)
  .limit(5) // Limit the results to 10 songs

  res.json(songs)
}
