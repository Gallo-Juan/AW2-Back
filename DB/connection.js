import mongoose from "mongoose";


let cached = global.mongoose || { conn: null, promise: null };

export const connectToDataBase = async () => {
    if (cached.conn) return cached.conn;

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) throw new Error("MONGODB_URI o missing");

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'MongoDB1',
        bufferCommands: false
    });

    cached.conn = await cached.promise;
    return cached.conn;
};