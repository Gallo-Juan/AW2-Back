import { Router } from "express";
import { createVenta } from "../DB/actions/ventas.actions.js";

const router=Router()



router.post('/', async (req, res) => { 
    try {
        
        const { id_usuario, total, direccion, productos } = req.body;

        if (!id_usuario || !total || !direccion || !productos || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ message: 'Faltan datos o los productos no son válidos' });
        }

        const ventaCreada = await createVenta(req.body);

        res.status(201).json({ message: 'Venta cargada con exito', venta: ventaCreada });

    } catch (error) {
        console.error("Error en POST /ventas:", error);

        // 5. Manejo de errores de Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Error de validación: " + error.message });
        }
        
        res.status(500).json({ message: 'Ocurrio un error al cargar la venta' });
    }
});

export default router