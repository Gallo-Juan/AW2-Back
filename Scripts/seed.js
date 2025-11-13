import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectToDataBase } from '../DB/connection.js'; 

import User from '../Schemas/usuarios.schema.js'
import Product from '../Schemas/productos.schema.js';
import Sale from '../Schemas/ventas.schema.js';

import usersData from '../Data/usuarios.json' with { type: 'json' };
import productsData from '../Data/productos.json' with { type: 'json' };
import salesData from '../Data/ventas.json' with { type: 'json' };

dotenv.config();

const seedDatabase = async () => {
    try {
      
        await connectToDataBase();
        console.log('Conectado a MongoDB.');

        console.log('Limpiando colecciones existentes...');
        await User.deleteMany({});
        await Product.deleteMany({});
        await Sale.deleteMany({});

        console.log('Cargando usuarios...');
        await User.insertMany(usersData);

        console.log('Cargando productos...');
        await Product.insertMany(productsData);

        if (salesData && salesData.length > 0) {
            console.log('Cargando ventas...');
            await Sale.insertMany(salesData);
        } else {
            console.log('No hay datos de ventas para cargar (archivo vacío o no hay items).');
        }

        console.log('-----------------------------------------');
        console.log('¡Base de datos sembrada (seeded) exitosamente!');
        console.log('-----------------------------------------');

    } catch (error) {
        console.error('Error al sembrar la base de datos:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada.');
    }
};

seedDatabase();