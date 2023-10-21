const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');

const auth  = require('../midlewares/auth.js');

// GET /songs - get all songs
router.get('/', async (req, res) => {
  try {
    // const role = req.user.role;
    // console.log(role);
    songsController.songs_get_all(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// GET /songs - get all songs
router.get('/lastAdded', async (req, res) => {
  try {
    // const role = req.user.role;
    // console.log(role);
    songsController.getTenLastAdded(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /songs/:id - get song by ID
router.get('/:id', async (req, res) => {
  try {
    songsController.songs_get_byId(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /songs - add a new song
router.post('/', async (req, res) => {
    try {
      songsController.add_new_song(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // PUT /songs/:id - update an existing song
router.put('/:id', async (req, res) => {
  try {
    songsController.update_song(req,res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /songs/:id - delete an existing song
router.delete('/:id', async (req, res) => {
  try {
    songsController.delete_song(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /songs/search - search for songs by title
router.get('/search', async (req, res) => {
  try {
    songsController.search_song_by_title(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
  
// GET /songs/search/author/:author - search for songs by author
router.get('/search/author/:author', async (req, res) => {
  try {
    songsController.search_song_by_author(req,res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /songs/search/genre/:genre - search for songs by genre
router.get('/search/genre/:genre', async (req, res) => {
  try {
    songsController.search_song_by_genre(req,res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// GET /songs/search/type/:type - search for songs by genre
router.get('/songs/search/type/:type', async (req, res) => {
  try {
    songsController.search_song_by_type(req,res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



module.exports = router;
