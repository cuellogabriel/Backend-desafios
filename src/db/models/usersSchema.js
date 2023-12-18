import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    isGitHub: { type: Boolean, default: false}
})

// UserSchema.plugin(mongoosePaginate);

// UserSchema.pre('find', function () {
//     this.populate('products')
// })

export const UserModel = model('users', UserSchema)