import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    code: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
})

ProductSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model('products', ProductSchema);

export default ProductModel;