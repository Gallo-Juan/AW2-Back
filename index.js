import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import usuariosRouter from './Routes/usuarios.routes.js'
import productosRouter from './Routes/productos.routes.js'
import ventasRouter from './Routes/ventas.routes.js'
import { connectToDataBase } from './DB/connection.js';

dotenv.config()
const app = express()

const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

// Definimos las rutas
app.use('/usuarios', usuariosRouter)
app.use('/productos', productosRouter)
app.use('/ventas',ventasRouter)

// Intentamos conectar a la DB y SOLO DESPUÉS levantamos el servidor
connectToDataBase()
    .then(() => {
        console.log('✅ ¡Conectado a MongoDB exitosamente!');
        app.listen(port, () => {
            console.log(`🚀 Servidor levantado en el puerto ${port}`);
        });
    })
    .catch(err => {
        console.error('❌ Error crítico al conectar a MongoDB:', err);
        console.log("El servidor no se iniciará. Revisa que mongod esté corriendo.");
    });