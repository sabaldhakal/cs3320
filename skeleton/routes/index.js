var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
  //res.render('index', { title: 'Fuel Quote' });
});

module.exports = router;
