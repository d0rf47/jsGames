const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const mainRouter = require("./routes/main");
const app = express();
app.use(express.static(__dirname + '/public'));
var HTTP_PORT = process.env.PORT || 6969;


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use("/game", mainRouter);

app.listen(HTTP_PORT, (err)=>{
    if(err)
        console.log(err)
    else
        console.log("listening on port: " + HTTP_PORT);
})
