const express = require("express");
const router = express.Router();

router.get('/',(request,respond) => {
    respond.render('index', { title: 'index' })
});

module.exports = router;