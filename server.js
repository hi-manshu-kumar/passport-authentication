const express = require("express");
const bodyParser = require("body-parser"); 
const port = process.env.PORT || 1234;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res)=> {
//     res.sendFile('index.html', { root: __dirname})
// });

app.use(express.static("public"));


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();  //compulsory so that control can use next middleware
  })

app.listen(port , () => console.log(` server running on port  ${port}...`));
