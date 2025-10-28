import { Router } from "express";
import {readFile, writeFile} from "fs/promises"

const router=Router()

const fileVentas = await readFile('./Data/ventas.json', 'utf-8')
const ventasData=JSON.parse(fileVentas)


router.post('/',(req,res)=>{
    try{
        const id_usuario=req.body.id_usuario
        const total=req.body.total
        const direccion=req.body.direccion
        const productos=req.body.productos

        if(!id_usuario || !total || !direccion || !productos){
            res.status(400).json({message:'Faltan datos'})
        }

      
        const ultimaVenta= ventasData[ventasData.length - 1];

    const nuevoId = ultimaVenta? ultimaVenta.id + 1 : 1;

        const nuevaVenta={
             "id": nuevoId,
            id_usuario,
            "fecha": new Date().toLocaleDateString('es-AR'),
            total,
            direccion,
            productos,
            "entregado": false
        }

        ventasData.push(nuevaVenta)

         writeFile('./Data/ventas.json', JSON.stringify(ventasData, null, 2),'utf-8');
        
        res.status(200).json({message:'Venta cargada con exito'})
    }catch(error){
        res.status(400).json({message:'Ocurrio un error al cargar la venta'})
    }
})


export default router