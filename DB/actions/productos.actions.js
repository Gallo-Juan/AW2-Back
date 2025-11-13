import producto from "../../Schemas/productos.schema.js";
import { connectToDataBase } from "../connection.js";

export const createProd=async({titulo,precio,descripcion,categoria,imagen,stock})=>{
    try{
        await connectToDataBase()
        const res=await producto.create({titulo,precio,descripcion,categoria,imagen,stock})
        return JSON.parse(res)
    }catch(error){
        console.log(error)
    }
}

export const TraerTodos=async()=>{
    try{
        await connectToDataBase()
        const res=await producto.find()
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)  
    }
}

export const TraerPorCategoria=async(cate)=>{
    try{
        await connectToDataBase()
        const res=await producto.find({categoria: cate})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)  
    }
}

