import { Router } from "express";
import { TraerPorCategoria, TraerTodos } from "../DB/actions/productos.actions.js";

const router=Router()

router.get('/traertodos',async(req,res)=>{
    try{
        const result=await TraerTodos()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json('Ocurrio un error al traer los productos: '+error)
    }
})

router.get('/traer/:categoria', async(req,res)=>{
    const cate=req.params.categoria
    try{
        const result=await TraerPorCategoria(cate)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json('Ocurrio un error al traer los productos: '+error)
    }
})


export default router