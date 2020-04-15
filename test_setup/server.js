/**
 * @author Marc-Etienne Dartus
 * @since 15/04/20
 */

let path = require("path");
let express = require("express");

let {PORT} = require("./config");

let app = express();

app.route("/test").get( (req, res) => {
  res.sendFile(path.join(__dirname, "test.html"), err => {
    if(err) throw err;
  });
});

app.route("/preview").get( (req, res) => {
  res.sendFile(path.join(__dirname, "preview.html"), err => {
    if(err) throw err;
  });
});

app.route("/empty").get( (req, res) => {
  res.sendFile(path.join(__dirname, "empty.html"), err => {
    if(err) throw err;
  });
});

app.listen(PORT,()=>{
  console.log(`hakaki's test files served on port ${PORT}`);
});