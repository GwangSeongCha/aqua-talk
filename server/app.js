var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var apiRouter = require("./routes/api");
var { sequelize } = require("./models/index");
const multer =require('multer');
var app = express();
sequelize.sync();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


/*
// FILE UPLOAD
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});
app.post('/upload', upload.single('img'), (req, res) => {
  console.log(req.file); 
});   
*/


//USE MIDDLEWARE
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//USE MYMIDDLEWARE ios에서 동작할것들은 /app에서시작
app.use("/api", apiRouter);

//passport
const passport = require("./lib/passport")(app);
/*
app.get('/file/download',(req,res)=>{
    
  res.sendfile(__dirname+'/uploads/default.jpg');

})
*/

/*
app.get('/download', function(req, res){
  const file = `${__dirname}/uploads/default.jpg`;
  res.download(file); // Set disposition and send it.
});
*/

/*
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
*/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});





module.exports = app;
