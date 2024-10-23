const express = require("express");
const app = express();
const cors = require("cors");


// Routes
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const { NotFoundError } = require("./core/ApiError");

// const port = 8080;

// Given origin means permission valid for given origin
app.use(cors({
    origin: [ process.env.FRONTEND_ORIGIN ],
    credentials: true
}))

app.use(express.json({limit:'10mb'}))   // This is the middleware used for post request. This middleware just intercept json object and convert into javascript object and put the data inside req.body

app.use("/api/v1", productRoutes);
// We are wiring all of the routes in our express application
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => next(new NotFoundError()));
  // It can match all the methods we have and star meaning any path  
  

/** Error handling Middleware */
app.use((err, req, res, next) => {
    const { status = 500, message = 'Internal Server Error' } = err;
    return res.status(status).json({status: "FAILED", message: message});
});



// This is GET all produts API.
// When you make a request '/products', you will get the above data. Now we have to wire this data to our frontend. 
// app.get('/api/v1/products', (req, res) => {
//     res.json(products);
// })

// app.get('/api/v2/products', (req, res) => {
//     res.json(products);
// })
// These above are same apis but the versin is upgraded one is v1 version and one is v2 version. This is called Versoning of APIs. This is the very raw form of versning of APIs but we have a different form of versoning of APIs.
// Instead of keeping all the apis/routes here we will make another folder named routes and will keep all the routes/apis there.


// Create a new product API.






// app.listen(port, () => {
//     console.log(`Server started at port ${port}`);
// })

module.exports = app;