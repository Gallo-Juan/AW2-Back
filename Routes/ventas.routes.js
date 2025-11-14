import { Router } from "express";
import { createVenta } from "../DB/actions/ventas.actions.js";
import { verifyToken } from "../Utils/middleware.js";

const router=Router()



router.post('/', verifyToken ,async (req, res) => { 
    console.log('Middleware OK. Datos del token:', req.usuario); 

    try {
        const id_usuario = req.usuario.id;

        // --- DEBUG 2 ---
        // Vamos a ver qué está mandando el frontend
        console.log('Body recibido del frontend:', req.body);

        const { total, direccion, productos } = req.body;

        if (!total || !direccion || !productos || !Array.isArray(productos) || productos.length === 0) {
            
            // --- DEBUG 3 ---
            console.error('¡FALLÓ LA VALIDACIÓN DE DATOS!'); // Sabrás que es aquí
            return res.status(400).json({ message: 'Faltan datos o los productos no son válidos' });
        }

        const datosVenta = {
            id_usuario: id_usuario,
            total: total,
            direccion: direccion,
            productos: productos
        };
        
        // --- DEBUG 4 ---
        console.log('Datos listos para guardar en DB:', datosVenta);

        const ventaCreada = await createVenta(datosVenta);
        res.status(201).json({ message: 'Venta cargada con exito', venta: ventaCreada });

    } catch (error) {
        // --- DEBUG 5 ---
        console.error("Error en POST /ventas:", error); // Esto te dirá si es un error de Mongoose

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Error de validación: " + error.message });
        }
        
        res.status(500).json({ message: 'Ocurrio un error al cargar la venta' });
    }
});

export default router