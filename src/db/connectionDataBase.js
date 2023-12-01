import mongoose from 'mongoose';

const connectionMongoDB = 'mongodb://127.0.0.1:27017/backendDesafios';

try {
    await mongoose.connect(connectionMongoDB);
    console.log('Conectado a la base de datos MongoDB');
} catch (error) {
    console.log(`Error => ${error}`);
}