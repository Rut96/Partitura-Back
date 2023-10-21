const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// GET /authors - get all authors
router.get('/', async (req, res) => {
  try {
    authorController.author_get_all(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /authors/:id - get author by ID
router.get('/:id', async (req, res) => {
  try {
    authorController.author_get_byId(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /authors - create new author
router.post('/', async (req, res) => {
  try {
    authorController.author_create_new(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /authors/:id - update author by ID
router.put('/:id', async (req, res) => {
  try {
    authorController.author_update(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /authors/:id - delete author by ID
router.delete('/:id', async (req, res) => {
  try {
    authorController.author_delete(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
