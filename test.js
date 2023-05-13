const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('./app');
const Product = require('./productSchema');

chai.use(chaiHttp);
const expect = chai.expect;

// Define the test data
const productData = {
  name: 'Test Product',
  price: 10.99,
  description: 'This is a test product',
};



// Test case for retrieving a single product by ID
describe('GET /api/products/:id', () => {
  it('should return a single product', (done) => {
    const product = new Product(productData);
    product.save((err, savedProduct) => {
      chai.request(app)
        .get(`/api/products/${savedProduct._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.name).to.equal(productData.name);
          expect(res.body.price).to.equal(productData.price);
          expect(res.body.description).to.equal(productData.description);
          done();
        });
    });
  });
});

// Test case for updating the price of a product by ID

describe('PATCH /api/products/:id', () => {
    it('should update the price of a product', (done) => {
      const product = new Product(productData);
      product.save((err, savedProduct) => {
        const newPrice = 15.99;
        chai.request(app)
          .patch(`/api/products/${savedProduct._id}`)
          .send({ price: newPrice })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.price).to.equal(newPrice);
  
            // Check if the price was updated in the database
            Product.findById(savedProduct._id, (err, updatedProduct) => {
              expect(updatedProduct.price).to.equal(newPrice);
              done();
            });
          });
      });
    });
  });

//   Test case for handling a request to update the price of a non-existent product

describe('PATCH /api/products/:id', () => {
    it('should return an error for updating a non-existent product', (done) => {
      const nonExistentProductId = mongoose.Types.ObjectId();
      const newPrice = 15.99;
      chai.request(app)
        .patch(`/api/products/${nonExistentProductId}`)
        .send({ price: newPrice })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Product not found');
          done();
        });
    });
  });
  