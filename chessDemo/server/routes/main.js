const express = require('express');
const router = express();
const exphbs = require('express-handlebars');

router.engine('handlebars', exphbs());
router.set('view engine', 'handlebars');


router.get("/", (req,res) =>
{
    res.render('home')
})

module.exports = router;