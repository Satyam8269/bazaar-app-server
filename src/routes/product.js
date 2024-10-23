// These routes belongs to products only.

const express = require("express");
const router = express.Router();    // Like previousy app object contains all the methods here router will contain all the methods of express.
const { v4: uuid } = require('uuid');
const Product = require('../Models/product');
const catchAsync = require("../core/catchAsync");
const { BadRequestError } = require("../core/ApiError");
const { isLoggedIn } = require('../middlewares/auth');

// Our app.js should be the minimum file. It woud be slim. It should not contain our all the routes They should be contain in a separate file for the clarity basically.

const products = [
    {
        id: uuid(),
        title: 'Jeans',
        price: 100,
        description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        image: "https://images.unsplash.com/photo-1608613517869-07b097abbcf3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHx8MHx8fDA%3Dhttps://images.unsplash.com/photo-1608613517869-07b097abbcf3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: uuid(),
        title: 'Macbook',
        price: 200,
        description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        image: "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: uuid(),
        title: 'Iphone Pro Max',
        price: 300,
        description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        image: "https://images.unsplash.com/photo-1709528922440-4fc4f05ef110?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwcHJvJTIwbWF4fGVufDB8fDB8fHww"
    },
    {
        id: uuid(),
        title: 'Iphone Pro Max',
        price: 300,
        description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        image: "https://images.unsplash.com/photo-1709528922440-4fc4f05ef110?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwcHJvJTIwbWF4fGVufDB8fDB8fHww"
    },
    {
        id: uuid(),
        title: 'Iphone Pro Max',
        price: 300,
        description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        image: "https://images.unsplash.com/photo-1709528922440-4fc4f05ef110?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwcHJvJTIwbWF4fGVufDB8fDB8fHww"
    }

]


// Get all products

router.get('/products', catchAsync( async (req, res) => {
    console.log(req.headers);
    const products = await Product.find();
    res.status(200).json(products);
}))

// Create a new product {For this I need a payload(data){We can skip the is as id should be automatically created}}

router.post('/products', isLoggedIn, catchAsync( async (req, res) => {
    //console.log(req.body);
    const { title, price, description, image } = req.body;
    await Product.create({ title, price, description, image });
    // products.push({...req.body, id: uuid()});
    res.status(201).json({
        status: "SUCCESS",
        message: "Product Created Successfully"
    });
}))


// Get a single product

router.get('/products/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params;              // Here id is in string datatype. So, we have to equalize it with double equal to. 
    // const product = products.find((product) => id == product.id);
    const product = await Product.findById(id);
    if(!product) {
        throw new BadRequestError(`Product with id ${id} not found`);
    }
    res.status(200).json(product);
}))


// Update a single product

router.patch('/products/:id', catchAsync(async (req, res) => {
    const { title, price, description, image } = req.body;
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product) {
        throw new BadRequestError(`Product with id ${id} not found`);
    }
    product.title = title;
    product.price = price;
    product.description = description;
    product.image = image;

    res.status(201).json({status: "SUCCESS", message: "Product updated successfully."})
}));


// Delete a single product

router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex((product) => id == product.id);

    if(productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
    }
    products.splice(productIndex, 1);
    res.status(200).json({status: "SUCCESS", message: "Product Deleted Successfully."})
})


module.exports = router;