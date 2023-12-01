import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    default:[]
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const CartSchema = new mongoose.Schema({
  products: [CartItemSchema],
});

CartSchema.pre('find', function () {
  this.populate('products'); 
});

const CartModel = mongoose.model('cart', CartSchema);

export default CartModel;
