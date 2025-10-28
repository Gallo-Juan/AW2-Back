import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import {readFile, writeFile} from 'fs/promises'
import usuariosRouter from './Routes/usuarios.routes.js'
import productosRouter from './Routes/productos.routes.js'
import ventasRouter from './Routes/ventas.routes.js'

dotenv.config()
const app = express()

const port = process.env.PORT || 3000


app.use(cors());
app.use(express.json());
/*
app.use(cors({
    origin:'http://127.0.0.1:3001'
}));
*/

app.listen(port,()=>{
    console.log(`Servidor levantado en el puerto ${port}`)
}) 

app.use('/usuarios', usuariosRouter)
app.use('/productos', productosRouter)
app.use('/ventas',ventasRouter)