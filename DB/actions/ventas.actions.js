import venta from "../../Schemas/ventas.schema.js";

export const createVenta = async (datosVenta) => {
    try {        
        const nuevaVenta = new venta(datosVenta);

        await nuevaVenta.save();
        
        return nuevaVenta; 

    } catch (error) {
        console.error("Error al crear la venta:", error);
        throw error;
    }
};