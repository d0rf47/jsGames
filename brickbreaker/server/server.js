const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const indexRouter = require("./routes/index");
require("dotenv").config({path:'./config/Keys.env'});
const app = express();
app.use(express.static(__dirname + '/public'));
var HTTP_PORT = process.env.PORT || 6969;


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use("/index", indexRouter);

app.listen(HTTP_PORT, (err)=>{
    if(err)
        console.log(err)
    else
        console.log("listening on port: " + HTTP_PORT);
})
