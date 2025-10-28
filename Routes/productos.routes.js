import { Router } from "express";
import {readFile, writeFile} from "fs/promises"

const router=Router()

const fileProductos = await readFile('./Data/productos.json', 'utf-8')
const productosData=JSON.parse(fileProductos)

router.get('/',(req,res)=>{
    try{

        const { categoria } = req.query;

        if(!categoria){
            res.status(200).json(productosData)
        }else{
            const productosFiltrados=productosData.filter(p=>p.categoria==categoria)
             res.status(200).json(productosFiltrados)
        }
        
    }catch(error){
        res.status(400).json({Message:'Ha ocurrido un error'})
    }
})



export default router