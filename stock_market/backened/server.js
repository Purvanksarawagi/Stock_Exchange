var express = require('express');
var app = express();
var fs= require("fs");
const path= require('path');
var bodyParser = require('body-parser');
const cors=require('cors');
// Allowing our app to use the body parser package.
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
const rstream = path.join(__dirname,"../front");
app.use(express.static(rstream));
var axios = require("axios").default;
app.use(bodyParser.json());
var options = {
method: 'GET',
url: 'https://latest-stock-price.p.rapidapi.com/price',
params: {Indices: 'NIFTY 50'},
headers: {
	'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com',
	'x-rapidapi-key': '9c4324e513mshdd7f131fa562556p1c3a3fjsnf8baf6f4993d'
}
};

// HANDLING THE POST REQUEST ON /DATA ROUTE.
app.post("/data", function(req, res) {

    var itemSelectedFromDropdown = req.body.stockSelected;
console.log(req.body.stockSelected);
    axios.request(options).then(function (response) {
        var dataFromResponse = response.data;

        for(var i = 0; i<dataFromResponse.length; i++){
            if(dataFromResponse[i].symbol == itemSelectedFromDropdown){

                var dataOfStock = dataFromResponse[i];
console.log("hello");
                res.send({
                    symbol: dataOfStock.symbol,
                    open: dataOfStock.open,
                    dayHigh: dataOfStock.dayHigh,
                    dayLow: dataOfStock.dayLow,
                    lastPrice: dataOfStock.lastPrice,
                    previousClose: dataOfStock.previousClose,
                    yearHigh: dataOfStock.yearHigh,
                    yearLow: dataOfStock.yearLow,
                    lastUpdateTime: dataOfStock.lastUpdateTime
                });
            }
        }
    }).catch(function (error) {
        console.error(error)
    });
});



var port = 3000;
app.listen(port, function() {
	console.log("Server started successfully at port 3000!");
});
