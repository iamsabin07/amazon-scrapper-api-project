const express = require('express');
const request = require('request-promise');

//to initialize app as express
const app= express();

//to create a port for the server
const PORT = process.env.PORT || 3003;


//baseURL fro API 
const apiURL =(apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//to parse json inputs
app.use(express.json());

//first route when the api runs
app.get('/', (req,res) => {
    res.send("Welcome to my API");
});

//to fetch product details
app.get('/products/:productId', async(req,res) => {
    const { productId }  =req.params;
    const {key} = req.query;
    try {
        const response = await request(`${apiURL(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//to fetch any current offers
app.get('/products/:productId/offers', async(req,res) => {
    const { productId }  =req.params;
    const {key} = req.query;
    try {
        const response = await request(`${apiURL(key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//to fetch search results
app.get('/search/:searchQuery', async(req,res) => {
    const { searchQuery }  =req.params;
    const {key} = req.query;
    try {
        const response = await request(`${apiURL(key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//to fetch product reviews
app.get('/products/:productId/reviews', async(req,res) => {
    const { productId }  =req.params;
    const {key} = req.query;
    try {
        const response = await request(`${apiURL(key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});



//to start the server on the port
app.listen(PORT, () => console.log(`Server initialized on port ${PORT}`));
