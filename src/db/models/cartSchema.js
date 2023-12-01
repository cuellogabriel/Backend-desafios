import mongoose from 'mongoose';

const  CartSchema = new mongoose.Schema({
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            default:[]
        }
    ]
});

CartSchema.pre('find', function(){
    this.populate('products')
})

export const CartModel = mongoose.model(
    'cart',
    CartSchema
);