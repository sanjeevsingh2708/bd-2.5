const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

let products = [
  {
    name: 'Product C',
    RAM: 8,
    ROM: 32,
    brand: 'Apple',
    OS: 'Android',
    price: 10000,
    ratings: 9.0,
  },
  {
    name: 'Product A',
    RAM: 4,
    ROM: 64,
    brand: 'Sumsang',
    OS: 'IOS',
    price: 15000,
    ratings: 7.0,
  },
  {
    name: 'Product B',
    RAM: 8,
    ROM: 16,
    brand: 'Apple',
    OS: 'IOS',
    price: 55000,
    ratings: 8.5,
  },
  {
    name: 'Product D',
    RAM: 2,
    ROM: 64,
    brand: 'Sumsang',
    OS: 'Android',
    price: 40000,
    ratings: 8.5,
  },
];

//========================================= Endpoint 1: Get the products sorted by popularity

function sortProductsByPopularity(product1, product2) {
  return product1.ratings - product2.ratings;
}

app.get('/products/sort/popularity', (req, res) => {
  let productsCopy = products.slice();
  productsCopy.sort(sortProductsByPopularity);
  res.json(productsCopy);
});

//========================================= Endpoint 2: Get the products sorted by “high-to-low” price

function sortProductsByPriceDesc(product1, product2) {
  return product2.price - product1.price;
}

app.get('/products/sort/price-high-to-low', (req, res) => {
  let productsCopy = products.slice();
  productsCopy.sort(sortProductsByPriceDesc);
  res.json(productsCopy);
});

//========================================= Endpoint 3: Get the products sorted by “low-to-high” price

function sortProductsByPriceAsc(product1, product2) {
  return product1.price - product2.price;
}

app.get('/products/sort/price-low-to-high', (req, res) => {
  let productsCopy = products.slice();
  productsCopy.sort(sortProductsByPriceAsc);
  res.json(productsCopy);
});

//========================================= Endpoint 4: Filter the products based on the “RAM” option.

function filterByRAM(product, RAM) {
  return product.RAM === RAM;
}

app.get('/products/filter/ram', (req, res) => {
  let RAM = parseInt(req.query.ram);
  let result = products.filter((product) => filterByRAM(product, RAM));
  res.json({ result });
});

//========================================= Endpoint 5: Filter the products based on the “ROM” option.

function filterByROM(product, ROM) {
  return product.ROM === ROM;
}

app.get('/products/filter/rom', (req, res) => {
  let ROM = parseInt(req.query.rom);
  let result = products.filter((product) => filterByROM(product, ROM));
  res.json(result);
});

//========================================= Endpoint 6: Filter the products based on the “Brand” option.

function filterByBrand(product, brand) {
  return product.brand.toLowerCase() === brand.toLowerCase();
}

app.get('/products/filter/brand', (req, res) => {
  let brand = req.query.brand;
  let result = products.filter((product) => filterByBrand(product, brand));
  res.json(result);
});

//========================================= Endpoint 7: Filter the products based on the “OS” option.

function filterByOS(product, OS) {
  return product.OS === OS;
}

app.get('/products/filter/os', (req, res) => {
  let OS = req.query.os;
  let result = products.filter((product) => filterByOS(product, OS));
  res.send(result);
});

//========================================= Endpoint 8: Filter the products based on the “Price” option.

function filterByPrice(product, price) {
  // console.log(product.price + ' : ' + price);
  return product.price <= price;
}

app.get('/products/filter/price', (req, res) => {
  let price = parseFloat(req.query.price);
  let result = products.filter((product) => filterByPrice(product, price));
  res.json(result);
});

//========================================= Endpoint 8: Send original array of products

app.get('/products', (req, res) => {
  res.json(products);
});

//=========================================

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
