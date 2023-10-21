const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.user_get_byId = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
};

exports.update_user_progress = async (req, res) => {
    const { songId, progress } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const songIndex = user.songs.findIndex(song => song.id === songId);
    if (songIndex === -1) {
      return res.status(404).send('Song not found in user songs');
    }
    user.songs[songIndex].progress = progress;
    await user.save();
    res.json(user);
};

exports.add_song_to_user_favorites = async (req, res) => {
    const { songId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).send('Song not found');
    }
    if (user.favorites.includes(songId)) {
      return res.status(400).send('Song already in user favorites');
    }
    user.favorites.push(songId);
    await user.save();
    res.json(user);
};

exports.deleteFavoriteSong = async (req, res) => {
  const userId = req.user.id;
  const songId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the song from the user's favorites list
    const index = user.favoriteSongs.indexOf(songId);
    if (index !== -1) {
      user.favoriteSongs.splice(index, 1);
      await user.save();
    }

    return res.status(200).json({ message: 'Song removed from favorites' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.register_a_new_user = async (req, res)=> {
  const user = new User(req.body);
  await user.save();
    res.json(user);
}