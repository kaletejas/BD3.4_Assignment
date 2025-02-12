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
});

//fn 2
function editItem(cart,productId,quantity){
  for(let i = 0; i < cart.length; i++){
    if(cart[i].productId === productId){
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}
// Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit',(req,res)=>{
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let cartItems = editItem(cart,productId,quantity);
  res.json({cartItems});
});

//fn 3
function deleteItem(cart, productId) {
  return cart.filter(item => item.productId !== productId);
}

//Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cartItems = deleteItem(cart, productId);
  res.json({ cartItems });
});

//Endpoint 4: Read Items in the Cart
app.get('/cart',(req,res)=>{
  res.json({cart});
})
 //fn 5
 function getTotalQuantity(cart){
  let totalQuantitiy = 0;  
  for(let i = 0; i< cart.length; i++){
      totalQuantitiy = totalQuantitiy + cart[i].quantity;
    }
    return totalQuantitiy;
 }
//Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity',(req,res)=>{
  let totalQuantitiy = getTotalQuantity(cart);
  res.json({totalQuantitiy});
});

//fn 6
function getTotalPrice(cart){
  let totalPrice = 0;
  for(let i = 0; i < cart.length; i++){
    totalPrice = totalPrice + (cart[i].quantity * cart[i].price);
  }
  return totalPrice;
}
//Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price',(req,res)=>{
  let totalPrice = getTotalPrice(cart);
  res.json({totalPrice});
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
