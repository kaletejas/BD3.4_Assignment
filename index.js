const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());

//Cart Data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

//fn 1
function addItem(cart,productId,name,price,quantity){
  cart.push({productId,name,price,quantity});
  return cart;
}
//Endpoint 1: Add an Item to the Cart
app.get('/cart/add',(req,res)=>{
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let cartItems = addItem(cart,productId,name,price,quantity);
  res.json({cartItems});
  

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
