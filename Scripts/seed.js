import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectToDataBase } from '../DB/connection.js'; 
import Product from '../Schemas/productos.schema.js';

import productsData from '../Data/productos.json' with { type: 'json' };

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectToDataBase();
        console.log('Conectado a MongoDB.');

        console.log('Limpiando productos...');
        await Product.deleteMany({});

        console.log('Cargando productos...');
        await Product.insertMany(productsData);

        console.log('-----------------------------------------');
        console.log('¡Productos cargados exitosamente!');
        console.log('-----------------------------------------');

    } catch (error) {
        console.error('Error al sembrar la base de datos:', error);
    } finally {
        await mongoose.connection.close();
    }
};

seedDatabase();