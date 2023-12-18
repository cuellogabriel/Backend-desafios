
import MongoStore from 'connect-mongo';
import { connectionMongoDB } from '../db/connectionDataBase.js'

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionMongoDB,
        ttl:120,
        crypto: {
            secret: '2344'
        }  
    }),
    secret: '13cao22ecg',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000,
    }
}