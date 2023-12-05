import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      // No necesitas el default aquí
    },
    quantity: {
      type: Number,
      default: 0,
    },
  }],
});

CartSchema.pre('findOne', function () {
  this.populate('products.product'); 
});

const CartModel = mongoose.model('cart', CartSchema);

export default CartModel;
