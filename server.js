//Node Modules
const express = require("express");
const app = express();

//Add routes for api and HTML
const apiRouter = require("./routes/apiRouter");
const htmlRouter = require("./routes/htmlRouter");

//Behold, a PORT
const PORT = process.env.PORT || 3001;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//MIDDLEWARE
//A built-in middleware function in express
//Parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//Specifies root directory from which to serve static assets
//Serves static files like images, css, JavaScript, etc. 

//Parse incoming JSON data
app.use(express.json());

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
app.use(express.static("public/assets"));
//ROUTES
//Connects our routes to our application using ".use"
app.use("/api", apiRouter);
app.use("/", htmlRouter);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//LISTEN
//This function binds and listens to the connection on the specified HOST and PORT. Is an asynchronous operation.
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
    });